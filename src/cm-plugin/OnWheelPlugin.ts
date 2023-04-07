import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    constructor(protected override view: EditorView) {
      super(view);
      view.contentDOM.addEventListener("wheel", this.onWheel.bind(this));
    }

    protected onWheel() {
      this.view.dom.classList.add("plugin-typewriter-mode-wheel");
    }

    override update(update: ViewUpdate) {
      super.update(update);
      this.view.dom.classList.remove("plugin-typewriter-mode-wheel");
    }

    override destroy() {
      this.view.contentDOM.removeEventListener("wheel", this.onWheel);
    }
  }
);
