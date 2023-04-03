import { ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    override update(update: ViewUpdate) {
      if (this.view.contentDOM.style.paddingTop) {
        this.view.contentDOM.style.paddingTop = "";
        this.view.contentDOM.style.paddingBottom =
          update.view.dom.clientHeight / 2 + "px";
      }
    }
  }
);
