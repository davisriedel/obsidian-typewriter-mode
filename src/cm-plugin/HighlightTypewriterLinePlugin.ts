import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import OnWheelPluginClass from "@/cm-plugin/OnWheelPluginClass";
import { getOffset } from "@/cm-plugin/TypewriterOffset";

export default ViewPlugin.fromClass(
  class extends OnWheelPluginClass {
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
      return typewriterLine;
    }

    private setTypeWriterLinePosition(
      view: EditorView,
      typewriterLine: HTMLElement
    ) {
      const offset = getOffset(view);

      const fontSize =
        view.contentDOM
          .querySelector(".cm-active.cm-line")
          ?.getCssPropertyValue("font-size") ?? view.defaultLineHeight + "px";
      const headerOffset = getComputedStyle(document.body).getPropertyValue(
        "--header-height"
      );

      typewriterLine.style.display = "block";
      typewriterLine.style.top = `calc(${offset}px + ${headerOffset})`;
      typewriterLine.style.height = fontSize;
    }

    protected onWheel() {
      const typewriterLine = this.getTypewriterLine(this.view);
      if (typewriterLine) typewriterLine.style.display = "none";
    }

    override update(update: ViewUpdate) {
      const typewriterLine = this.getOrAddTypewriterLine(update.view);
      this.setTypeWriterLinePosition(update.view, typewriterLine);
    }
  }
);
