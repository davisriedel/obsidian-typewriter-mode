import { EditorView } from "@codemirror/view";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";

export function getTypewriterPositionData(view: EditorView) {
  const [fontSize, lineHeight] = ["font-size", "line-height"].map((prop) => {
    const val = parseFloat(
      view.contentDOM
        .querySelector(".cm-active.cm-line")
        ?.getCssPropertyValue(prop)
        .replace("px", "")
    );
    return isNaN(val) ? view.defaultLineHeight : val;
  });

  const percentage = view.state.facet(pluginSettingsFacet).typewriterOffset;
  const editorOffset = view.dom.clientHeight * percentage;
  const lineOffset = (lineHeight - fontSize) / 2;
  const offset = editorOffset - lineOffset;

  return {
    fontSize,
    lineHeight,
    offset,
  };
}
