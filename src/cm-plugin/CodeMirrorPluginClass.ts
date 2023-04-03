/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { EditorView, ViewUpdate } from "@codemirror/view";

export default abstract class CodeMirrorPluginClass {
  constructor(protected view: EditorView) {}

  update(update: ViewUpdate) {}

  destroy() {}
}
