import { EditorView, ViewPlugin } from "@codemirror/view";
import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import type { TypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";
import { measureTypewriterPosition } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginBaseClass {
    private typewriterLine: HTMLElement | null = null;
    private isInitialInteraction = true;

    protected override onLoad() {
      super.onLoad();
      window.addEventListener("moveByCommand", this.moveByCommand.bind(this));
      this.updateAfterExternalEvent();
    }

    protected override updateAllowedUserEvent() {
      super.updateAllowedUserEvent();
      this.view.dom.classList.remove("ptm-select");
      if (this.isInitialInteraction) {
        this.view.dom.classList.remove("ptm-first-open");
        this.isInitialInteraction = false;
      }
      measureTypewriterPosition(
        this.view,
        "TypewriterModeUpdateAfterUserEvent",
        (measure, view) => {
          this.recenterAndMoveTypewriterLineHighlight(view, measure);
        }
      );
    }

    protected override updateDisallowedUserEvent() {
      super.updateDisallowedUserEvent();
      if (this.isInitialInteraction) {
        this.view.dom.classList.remove("ptm-first-open");
        this.isInitialInteraction = false;
      }
      this.view.dom.classList.add("ptm-select");
      measureTypewriterPosition(
        this.view,
        "TypewriterModeUpdateAfterUserEvent",
        ({ activeLineOffset, lineHeight }, view) => {
          const { isHighlightTypewriterLineEnabled } =
            view.state.facet(pluginSettingsFacet);
          if (isHighlightTypewriterLineEnabled)
            this.moveTypewriterLineHighlight(
              view,
              activeLineOffset,
              lineHeight
            );
        }
      );
    }

    protected override updateNonUserEvent() {
      super.updateNonUserEvent();
      if (!this.isInitialInteraction) return;
      const { isOnlyActivateAfterFirstInteractionEnabled } =
        this.view.state.facet(pluginSettingsFacet);
      if (isOnlyActivateAfterFirstInteractionEnabled)
        this.view.dom.classList.add("ptm-first-open");
    }

    private moveByCommand() {
      this.view.dom.classList.remove("ptm-select");
      this.updateAllowedUserEvent();
    }

    protected override onResize() {
      super.onResize();
      this.updateAfterExternalEvent();
    }

    override destroy() {
      super.destroy();
      this.typewriterLine?.remove();
      window.removeEventListener(
        "moveByCommand",
        this.moveByCommand.bind(this)
      );
    }

    private updateAfterExternalEvent() {
      const { isTypewriterScrollEnabled } =
        this.view.state.facet(pluginSettingsFacet);
      measureTypewriterPosition(
        this.view,
        "TypewriterModeUpdateAfterExternalEvent",
        (measure, view) => {
          if (isTypewriterScrollEnabled)
            this.setPadding(view, measure.typewriterOffset);
          this.recenterAndMoveTypewriterLineHighlight(view, measure);
        }
      );
    }

    private createTypewriterLine(view: EditorView) {
      this.typewriterLine = document.createElement("div");
      this.typewriterLine.id = "ptm-typewriter-line";
      const settings = view.state.facet(pluginSettingsFacet);
      this.typewriterLine.className = `ptm-typewriter-line-${settings.typewriterLineHighlightStyle}`;
      view.dom.appendChild(this.typewriterLine);
    }

    private moveTypewriterLineHighlight(
      view: EditorView,
      offset: number,
      lineHeight: number
    ) {
      if (this.typewriterLine == null) this.createTypewriterLine(view);
      this.typewriterLine.style.height = `${lineHeight}px`;
      this.typewriterLine.style.top = `${offset}px`;
    }

    private setPadding(view: EditorView, offset: number) {
      const { isOnlyMaintainTypewriterOffsetWhenReachedEnabled } =
        view.state.facet(pluginSettingsFacet);

      const cmSizer = view.dom.getElementsByClassName(
        "cm-sizer"
      )[0] as HTMLElement;

      cmSizer.style.padding = isOnlyMaintainTypewriterOffsetWhenReachedEnabled
        ? `0 0 ${offset}px 0`
        : `${offset}px 0`;
    }

    private recenter(view: EditorView, offset: number) {
      const head = view.state.selection.main.head;
      const effect = EditorView.scrollIntoView(head, {
        y: "start",
        yMargin: offset,
      });
      const transaction = view.state.update({ effects: effect });
      view.dispatch(transaction);
    }

    private recenterAndMoveTypewriterLineHighlight(
      view: EditorView,
      { scrollOffset, lineHeight }: TypewriterPositionData
    ) {
      const {
        isTypewriterScrollEnabled,
        isKeepLinesAboveAndBelowEnabled,
        isHighlightTypewriterLineEnabled,
      } = view.state.facet(pluginSettingsFacet);
      if (isTypewriterScrollEnabled || isKeepLinesAboveAndBelowEnabled)
        this.recenter(view, scrollOffset);
      if (isHighlightTypewriterLineEnabled)
        this.moveTypewriterLineHighlight(view, scrollOffset, lineHeight);
    }
  }
);
