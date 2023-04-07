import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import { getTypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginBaseClass {
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
      // can't update inside an update, so request the next animation frame
      window.requestAnimationFrame(() => {
        const { lineHeight, offset } = getTypewriterPositionData(view);
        typewriterLine.style.height = `${lineHeight}px`;
        typewriterLine.style.top = `${offset}px`;
      });
    }

    private updateTypewriterLine(view: EditorView) {
      const typewriterLine = this.getOrAddTypewriterLine(view);
      this.setTypeWriterLinePosition(view, typewriterLine);
    }

    protected override onload() {
      super.onload();
      this.updateTypewriterLine(this.view);
    }

    protected override updateAllowedUserEvent(update: ViewUpdate) {
      super.updateAllowedUserEvent(update);
      this.updateTypewriterLine(update.view);
    }
  }
);
