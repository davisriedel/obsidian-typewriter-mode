import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import getTypewriterOffset from "@/cm-plugin/getTypewriterOffset";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private getTypewriterLine(view: EditorView) {
      return view.contentDOM.querySelector(
        "#plugin-typewriter-mode-typewriter-line"
      ) as HTMLElement;
    }

    private getOrAddTypewriterLine(view: EditorView) {
      let typewriterLine = this.getTypewriterLine(view);
      if (typewriterLine == null) {
        // create the typewriter line
        typewriterLine = document.createElement("div");
        typewriterLine.id = "plugin-typewriter-mode-typewriter-line";
        view.contentDOM.appendChild(typewriterLine);
      }
      const settings = view.state.facet(pluginSettingsFacet);
      typewriterLine.className = `plugin-typewriter-mode-typewriter-line-${settings.typewriterLineHighlightStyle}`;
      return typewriterLine;
    }

    private setTypeWriterLinePosition(
      view: EditorView,
      typewriterLine: HTMLElement
    ) {
      const offset = getTypewriterOffset(view);

      const fontSize =
        view.contentDOM
          .querySelector(".cm-active.cm-line")
          ?.getCssPropertyValue("font-size") ?? view.defaultLineHeight + "px";
      const headerOffset = getComputedStyle(document.body).getPropertyValue(
        "--header-height"
      );

      typewriterLine.style.top = `calc(${offset}px + ${headerOffset})`;
      typewriterLine.style.height = fontSize;
    }

    override update(update: ViewUpdate) {
      const typewriterLine = this.getOrAddTypewriterLine(update.view);
      this.setTypeWriterLinePosition(update.view, typewriterLine);
    }
  }
);
