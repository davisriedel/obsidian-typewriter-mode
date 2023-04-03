import { Transaction } from "@codemirror/state";
import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import { getOffset } from "@/cm-plugin/TypewriterOffset";
import { snapTypewriterOnClickEnabled } from "@/cm-plugin/SnapTypewriterOnClick";

const allowedUserEvents = /^(select|input|delete|undo|redo)(\..+)?$/;
const disallowedUserEvents = /^(select.pointer)$/;

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private myUpdate = false;

    private isUserEventAllowed(view: EditorView, event: string) {
      const snapOnClick = view.state.facet(snapTypewriterOnClickEnabled);
      if (snapOnClick) {
        return allowedUserEvents.test(event);
      } else {
        return (
          allowedUserEvents.test(event) && !disallowedUserEvents.test(event)
        );
      }
    }

    override update(update: ViewUpdate) {
      if (this.myUpdate) this.myUpdate = false;
      else {
        const userEvents = update.transactions.map((tr) =>
          tr.annotation(Transaction.userEvent)
        );
        const isAllowed = userEvents.reduce<boolean>(
          (result, event) =>
            result && this.isUserEventAllowed(update.view, event),
          userEvents.length > 0
        );
        if (isAllowed) {
          this.myUpdate = true;
          this.centerOnHead(update);
        }
      }
    }

    centerOnHead(update: ViewUpdate) {
      // can't update inside an update, so request the next animation frame
      window.requestAnimationFrame(() => {
        // current selection range
        if (update.state.selection.ranges.length == 1) {
          // only act on the one range
          const head = update.state.selection.main.head;
          const prevHead = update.startState.selection.main.head;
          // TODO: work out line number and use that instead? Is that even possible?
          // don't bother with this next part if the range (line??) hasn't changed
          if (prevHead != head) {
            // this is the effect that does the centering
            const offset = getOffset(update.view);
            const effect = EditorView.scrollIntoView(head, {
              y: "start",
              yMargin: offset,
            });
            // const effect = EditorView.scrollIntoView(head, { y: "center" });
            const transaction = this.view.state.update({ effects: effect });
            this.view.dispatch(transaction);
          }
        }
      });
    }
  }
);
