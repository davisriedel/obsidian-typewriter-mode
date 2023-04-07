import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import { getTypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private getTypewriterLine(view: EditorView) {
      return view.dom.querySelector(
        "#plugin-typewriter-mode-typewriter-line"
      ) as HTMLElement;
    }

    private getOrAddTypewriterLine(view: EditorView) {
      let typewriterLine = this.getTypewriterLine(view);
      if (typewriterLine == null) {
        // create the typewriter line
        typewriterLine = document.createElement("div");
        typewriterLine.id = "plugin-typewriter-mode-typewriter-line";
        view.dom.appendChild(typewriterLine);
      }
      const settings = view.state.facet(pluginSettingsFacet);
      typewriterLine.className = `plugin-typewriter-mode-typewriter-line-${settings.typewriterLineHighlightStyle}`;
      return typewriterLine;
    }

    private setTypeWriterLinePosition(
      view: EditorView,
      typewriterLine: HTMLElement
    ) {
      const { lineHeight, offset } = getTypewriterPositionData(view);
      typewriterLine.style.height = `${lineHeight}px`;
      typewriterLine.style.top = `${offset}px`;
    }

    override update(update: ViewUpdate) {
      const typewriterLine = this.getOrAddTypewriterLine(update.view);
      this.setTypeWriterLinePosition(update.view, typewriterLine);
    }
  }
);
