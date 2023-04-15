import { ViewPlugin } from "@codemirror/view";
import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginBaseClass {
    protected override onLoad() {
      this.view.contentDOM.addEventListener("wheel", this.onWheel.bind(this));
    }

    protected onWheel() {
      this.view.dom.classList.add("ptm-wheel");
    }

    protected override updateAllowedUserEvent() {
      super.updateAllowedUserEvent();
      this.view.dom.classList.remove("ptm-wheel");
    }

    override destroy() {
      this.view.contentDOM.removeEventListener("wheel", this.onWheel);
    }
  }
);
