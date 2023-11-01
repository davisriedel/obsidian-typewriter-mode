import { EditorView, ViewPlugin } from "@codemirror/view";
import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import type { TypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";
import { measureTypewriterPosition } from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginBaseClass {
    private currentLineHighlight: HTMLElement | null = null;
    private isInitialInteraction = true;
    private isRenderingAllowedUserEvent = false;

    protected override onLoad() {
      super.onLoad();
      this.view.scrollDOM.addEventListener("wheel", this.onWheel.bind(this));
      window.addEventListener("moveByCommand", this.moveByCommand.bind(this));
      this.updateAfterExternalEvent();
    }

    protected override updateAllowedUserEvent() {
      super.updateAllowedUserEvent();
      this.view.dom.classList.remove("ptm-wheel");
      this.view.dom.classList.remove("ptm-select");
      if (this.isInitialInteraction) {
        this.view.dom.classList.remove("ptm-first-open");
        this.isInitialInteraction = false;
      }
      this.isRenderingAllowedUserEvent = true;
      measureTypewriterPosition(
        this.view,
        "TypewriterModeUpdateAfterUserEvent",
        (measure, view) => {
          this.recenterAndMoveCurrentLineHighlight(view, measure);
          this.isRenderingAllowedUserEvent = false;
        },
      );
    }

    protected override updateDisallowedUserEvent() {
      if (this.isRenderingAllowedUserEvent) return;
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
          const { isHighlightCurrentLineEnabled } =
            view.state.facet(pluginSettingsFacet);
          if (isHighlightCurrentLineEnabled)
            this.moveCurrentLineHighlight(view, activeLineOffset, lineHeight);
        },
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

    protected onWheel() {
      this.view.dom.classList.add("ptm-wheel");
    }

    override destroy() {
      super.destroy();
      this.currentLineHighlight?.remove();
      this.view.scrollDOM.removeEventListener("wheel", this.onWheel);
      window.removeEventListener(
        "moveByCommand",
        this.moveByCommand.bind(this),
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
          this.recenterAndMoveCurrentLineHighlight(view, measure);
        },
      );
    }

    private createCurrentLineHighlight(view: EditorView) {
      this.currentLineHighlight = document.createElement("div");
      this.currentLineHighlight.id = "ptm-current-line-highlight";
      const settings = view.state.facet(pluginSettingsFacet);
      this.currentLineHighlight.className = `ptm-current-line-highlight-${settings.currentLineHighlightStyle}`;
      view.dom.appendChild(this.currentLineHighlight);
    }

    private moveCurrentLineHighlight(
      view: EditorView,
      offset: number,
      lineHeight: number,
    ) {
      if (this.currentLineHighlight == null)
        this.createCurrentLineHighlight(view);
      this.currentLineHighlight.style.height = `${lineHeight}px`;
      this.currentLineHighlight.style.top = `${offset}px`;
    }

    private setPadding(view: EditorView, offset: number) {
      const { isOnlyMaintainTypewriterOffsetWhenReachedEnabled } =
        view.state.facet(pluginSettingsFacet);

      const cmSizer = view.dom.getElementsByClassName(
        "cm-sizer",
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

    private recenterAndMoveCurrentLineHighlight(
      view: EditorView,
      { scrollOffset, lineHeight }: TypewriterPositionData,
    ) {
      const {
        isTypewriterScrollEnabled,
        isKeepLinesAboveAndBelowEnabled,
        isHighlightCurrentLineEnabled,
      } = view.state.facet(pluginSettingsFacet);
      if (isTypewriterScrollEnabled || isKeepLinesAboveAndBelowEnabled)
        this.recenter(view, scrollOffset);
      if (isHighlightCurrentLineEnabled)
        this.moveCurrentLineHighlight(view, scrollOffset, lineHeight);
    }
  },
);
