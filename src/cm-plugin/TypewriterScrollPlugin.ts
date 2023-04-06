import { EditorState, Transaction } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import getTypewriterOffset from "@/cm-plugin/getTypewriterOffset";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";

const allowedUserEvents = /^(select|input|delete|undo|redo)(\..+)?$/;
const disallowedUserEvents = /^(select.pointer)$/;

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private myUpdate = false;
    private topPadding: string = null;

    private isSnapOnClickEnabled(view: EditorView) {
      const settings = view.state.facet(pluginSettingsFacet);
      return (
        settings.snapTypewriterOnClickEnabled ||
        settings.highlightTypewriterLineEnabled
      );
    }

    private userEventsAllowed(userEvents: string[], snapOnClick: boolean) {
      return userEvents.reduce<boolean>((result, event) => {
        if (!result) return false;
        return (
          allowedUserEvents.test(event) &&
          (snapOnClick || !disallowedUserEvents.test(event))
        );
      }, userEvents.length > 0);
    }

    override update(update: ViewUpdate) {
      const offset = getTypewriterOffset(update.view);

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
        this.centerOnHead(head, offset);
        return;
      }

      // Check if the user interaction is one that should trigger a snap
      const snapOnClick = this.isSnapOnClickEnabled(update.view);
      if (!this.userEventsAllowed(userEvents, snapOnClick)) return;

      // The next update to come is from the effect we're about to dispatch
      this.myUpdate = true;

      // Only update if the cursor moved
      if (update.state.selection.ranges.length != 1) return;
      if (!this.hasLineChanged(update)) return;

      // Place the selection head at the offset
      this.centerOnHead(head, offset);
    }

    private getLineNumber(state: EditorState) {
      return state.doc.lineAt(state.selection.main.head).number;
    }

    private hasLineChanged(update: ViewUpdate) {
      const prevLine = this.getLineNumber(update.startState);
      const newLine = this.getLineNumber(update.state);
      return prevLine != newLine;
    }

    private centerOnHead(head: number, offset: number) {
      console.log("centerOnHead", head, offset);
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
