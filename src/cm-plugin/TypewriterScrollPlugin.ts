import { Transaction } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import { getTypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private myUpdate = false;

    private userEventAllowed(event: string) {
      const allowed = /^(select|input|delete|undo|redo)(\..+)?$/;
      const disallowed = /^(select.pointer)$/;
      return allowed.test(event) && !disallowed.test(event);
    }

    private userEventsAllowed(userEvents: string[]) {
      return userEvents.reduce<boolean>((result, event) => {
        return result && this.userEventAllowed(event);
      }, userEvents.length > 0);
    }

    private setPadding() {
      this.view.requestMeasure({
        read: (view) => {
          const cmSizer = view.dom.getElementsByClassName(
            "cm-sizer"
          )[0] as HTMLElement;
          const clientHeight = view.contentDOM.clientHeight;
          if (clientHeight == 0) return;
          cmSizer.style.padding = `${clientHeight}px 0`;
        },
      });
    }

    constructor(protected override view: EditorView) {
      super(view);
      this.setPadding();
    }

    override update(update: ViewUpdate) {
      // Ignore updates that are caused by this plugin
      if (this.myUpdate) {
        this.myUpdate = false;
        return;
      }

      // Only continue if cursor is placed
      if (update.state.selection.ranges.length != 1) return;
      const head = update.state.selection.main.head;

      // Get the user events
      const userEvents = update.transactions
        .map((tr) => tr.annotation(Transaction.userEvent))
        .filter((event) => event !== undefined);

      // If the editor geometry changed without user interaction, re-center the cursor
      if (userEvents.length == 0 && !update.selectionSet) {
        this.view.dom.classList.remove("plugin-typewriter-mode-select");
        this.view.dom.classList.remove("plugin-typewriter-mode-wheel");
        this.centerOnHead(head);
        return;
      }

      // Check if the user interaction is one that should trigger a snap
      if (!this.userEventsAllowed(userEvents) && update.selectionSet) {
        this.view.dom.classList.add("plugin-typewriter-mode-select");
        return;
      }
      this.view.dom.classList.remove("plugin-typewriter-mode-select");

      // Place the selection head at the offset
      this.centerOnHead(head);
    }

    private centerOnHead(head: number) {
      // The next update to come is from the effect we're about to dispatch
      this.myUpdate = true;

      // can't update inside an update, so request the next animation frame
      window.requestAnimationFrame(() => {
        // this is the effect that does the centering
        const { offset } = getTypewriterPositionData(this.view);
        const effect = EditorView.scrollIntoView(head, {
          y: "start",
          yMargin: offset,
        });
        const transaction = this.view.state.update({ effects: effect });
        this.view.dispatch(transaction);
      });
    }
  }
);
