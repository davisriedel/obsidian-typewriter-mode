import { EditorView } from "@codemirror/view";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";

export default function getTypewriterOffset(view: EditorView) {
  const typewriterOffset =
    view.state.facet(pluginSettingsFacet).typewriterOffset;
  return view.dom.clientHeight * typewriterOffset - view.defaultLineHeight / 2;
}
