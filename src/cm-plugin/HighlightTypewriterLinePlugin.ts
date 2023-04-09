import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import { getTypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginBaseClass {
    private getTypewriterLine(view: EditorView) {
      return view.dom.querySelector("#ptm-typewriter-line") as HTMLElement;
    }

    private getOrAddTypewriterLine(view: EditorView) {
      let typewriterLine = this.getTypewriterLine(view);
      if (typewriterLine == null) {
        // create the typewriter line
        typewriterLine = document.createElement("div");
        typewriterLine.id = "ptm-typewriter-line";
        view.dom.appendChild(typewriterLine);
      }
      const settings = view.state.facet(pluginSettingsFacet);
      typewriterLine.className = `ptm-typewriter-line-${settings.typewriterLineHighlightStyle}`;
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

    private updateTypewriterLine() {
      const typewriterLine = this.getOrAddTypewriterLine(this.view);
      this.setTypeWriterLinePosition(this.view, typewriterLine);
    }

    protected override onLoad() {
      super.onLoad();

      window.addEventListener(
        "moveByCommand",
        this.updateTypewriterLine.bind(this)
      );
      const { isTypewriterOnlyUseCommandsEnabled } =
        this.view.state.facet(pluginSettingsFacet);
      if (isTypewriterOnlyUseCommandsEnabled) return;

      this.updateTypewriterLine();
    }

    protected override updateAllowedUserEvent(update: ViewUpdate) {
      super.updateAllowedUserEvent(update);
      this.updateTypewriterLine();
    }

    protected override onResize() {
      super.onResize();
      this.updateTypewriterLine();
    }

    override destroy() {
      super.destroy();
      window.removeEventListener(
        "moveByCommand",
        this.updateTypewriterLine.bind(this)
      );
    }
  }
);
