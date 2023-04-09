import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";
import { getTypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginBaseClass {
    private setPadding() {
      this.view.requestMeasure({
        read: (view) => {
          const cmSizer = view.dom.getElementsByClassName(
            "cm-sizer"
          )[0] as HTMLElement;
          const { offset } = getTypewriterPositionData(this.view);
          cmSizer.style.padding = `${offset}px 0`;
        },
      });
    }

    protected override onLoad() {
      this.setPadding();
      this.view.dom.classList.remove("ptm-select");
      const head = this.view.state.selection.main.head;
      this.centerOnHead(head);
    }

    protected override updateAllowedUserEvent(update: ViewUpdate) {
      super.updateAllowedUserEvent(update);
      this.view.dom.classList.remove("ptm-select");
      if (update.state.selection.ranges.length != 1) return;
      const head = update.state.selection.main.head;
      const prev = update.startState.selection.main.head;
      if (head == prev) return;
      this.centerOnHead(head);
    }

    protected override updateDisallowedUserEvent(update: ViewUpdate) {
      super.updateDisallowedUserEvent(update);
      this.view.dom.classList.add("ptm-select");
    }

    protected override onResize() {
      super.onResize();
      const head = this.view.state.selection.main.head;
      this.centerOnHead(head);
    }

    private centerOnHead(head: number) {
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
