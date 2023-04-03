import { ViewPlugin, ViewUpdate } from "@codemirror/view";
import OnWheelPluginClass from "@/cm-plugin/OnWheelPluginClass";

export default ViewPlugin.fromClass(
  class extends OnWheelPluginClass {
    protected override onWheel() {
      document.body.classList.add("plugin-typewriter-mode-wheel");
    }

    override update(_update: ViewUpdate) {
      document.body.classList.remove("plugin-typewriter-mode-wheel");
    }
  }
);
