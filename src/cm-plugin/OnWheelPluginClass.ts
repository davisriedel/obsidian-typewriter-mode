import { EditorView } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";

export default abstract class OnWheelPluginClass extends CodeMirrorPluginClass {
  constructor(protected override view: EditorView) {
    super(view);
    view.contentDOM.addEventListener("wheel", () => {
      this.onWheel();
    });
  }

  protected abstract onWheel(): void;

  override destroy() {
    this.view.contentDOM.removeEventListener("wheel", this.onWheel);
  }
}
