import { Transaction } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import { getTypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private myUpdate = false;
    private topPadding: string = null;

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

    override update(update: ViewUpdate) {
      const { offset } = getTypewriterPositionData(update.view);

      // update the padding
      this.topPadding = offset + "px";
      if (this.topPadding != this.view.contentDOM.style.paddingTop) {
        this.view.contentDOM.style.paddingTop = this.topPadding;
        this.view.contentDOM.style.paddingBottom = `${
          update.view.dom.clientHeight - offset
        }px`;
      }

      // Ignore updates that are caused by this plugin
      if (this.myUpdate) {
        this.myUpdate = false;
        return;
      }

      const head = update.state.selection.main.head;

      const userEvents = update.transactions.map((tr) =>
        tr.annotation(Transaction.userEvent)
      );
      if (userEvents.length == 0) {
        // update was not caused by user interaction, the scroll position may have changed
        document.body.classList.remove("plugin-typewriter-mode-select");
        this.centerOnHead(head, offset);
        return;
      }

      // Check if the user interaction is one that should trigger a snap
      if (!this.userEventsAllowed(userEvents)) {
        document.body.classList.add("plugin-typewriter-mode-select");
        return;
      }
      document.body.classList.remove("plugin-typewriter-mode-select");

      // Only update if the cursor moved
      if (update.state.selection.ranges.length != 1) return;
      const prevHead = update.startState.selection.main.head;
      if (head == prevHead) return;

      // Place the selection head at the offset
      this.centerOnHead(head, offset);
    }

    private centerOnHead(head: number, offset: number) {
      // The next update to come is from the effect we're about to dispatch
      this.myUpdate = true;

      // can't update inside an update, so request the next animation frame
      window.requestAnimationFrame(() => {
        // this is the effect that does the centering
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
