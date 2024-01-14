import CodeMirrorPluginBaseClass from "@/cm-plugin/CodeMirrorPluginBaseClass";
import { perWindowProps } from "@/cm-plugin/PerWindowProps";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import type { TypewriterPositionData } from "@/cm-plugin/getTypewriterOffset";
import { measureTypewriterPosition } from "@/cm-plugin/getTypewriterOffset";
import { EditorView, ViewPlugin } from "@codemirror/view";

export default ViewPlugin.fromClass(
	class extends CodeMirrorPluginBaseClass {
		private currentLineHighlight: HTMLElement | null = null;
		private isInitialInteraction = true;
		private isRenderingAllowedUserEvent = false;

		protected override onLoad() {
			super.onLoad();

			const props = this.view.state.facet(perWindowProps);
			this.view.dom.ownerDocument.body.addClasses(props.bodyClasses);
			this.view.dom.ownerDocument.body.setCssProps(props.cssVariables);
			this.view.dom.ownerDocument.body.setAttrs(props.bodyAttrs);

			window.addEventListener("moveByCommand", this.moveByCommand.bind(this));
			this.updateAfterExternalEvent();
		}

		private setupWheelListener() {
			const ownerScrollDOM = this.view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-scroller",
			);
			if (ownerScrollDOM)
				ownerScrollDOM.addEventListener("wheel", this.onWheel.bind(this));
		}

		protected override updateAllowedUserEvent() {
			super.updateAllowedUserEvent();

			const ownerDOM = this.view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-editor",
			);
			if (ownerDOM) {
				ownerDOM.classList.remove("ptm-wheel");
				ownerDOM.classList.remove("ptm-select");
			}

			if (this.isInitialInteraction) {
				this.view.dom.ownerDocument.body.classList.remove("ptm-first-open");
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
				this.view.dom.ownerDocument.body.classList.remove("ptm-first-open");
				this.isInitialInteraction = false;
			}

			const ownerDOM = this.view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-editor",
			);
			if (ownerDOM) ownerDOM.classList.add("ptm-select");

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
				this.view.dom.ownerDocument.body.classList.add("ptm-first-open");
		}

		private moveByCommand() {
			const ownerDOM = this.view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-editor",
			);
			if (ownerDOM) ownerDOM.classList.remove("ptm-select");
			this.updateAllowedUserEvent();
		}

		protected override onResize() {
			super.onResize();
			this.updateAfterExternalEvent();
		}

		protected onWheel() {
			const ownerDOM = this.view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-editor",
			);
			if (ownerDOM) ownerDOM.classList.add("ptm-wheel");
		}

		override destroy() {
			super.destroy();

			this.currentLineHighlight?.remove();

			const ownerScrollDOM = this.view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-scroller",
			);
			if (ownerScrollDOM)
				ownerScrollDOM.removeEventListener("wheel", this.onWheel);

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
					this.setupWheelListener();
					if (isTypewriterScrollEnabled)
						this.setPadding(view, measure.typewriterOffset);
					this.recenterAndMoveCurrentLineHighlight(view, measure);
				},
			);
		}

		private loadCurrentLineHighlight(view: EditorView) {
			const ownerDOM = view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-editor",
			);
			if (!ownerDOM) return false;

			const currentLineHighlightQuery = ownerDOM.querySelector(
				".ptm-current-line-highlight",
			) as HTMLElement;

			if (!currentLineHighlightQuery) {
				this.currentLineHighlight = document.createElement("div");
				const settings = view.state.facet(pluginSettingsFacet);
				this.currentLineHighlight.className = `ptm-current-line-highlight ptm-current-line-highlight-${settings.currentLineHighlightStyle}`;

				ownerDOM.appendChild(this.currentLineHighlight);
			} else {
				this.currentLineHighlight = currentLineHighlightQuery;
			}

			return true;
		}

		private moveCurrentLineHighlight(
			view: EditorView,
			offset: number,
			lineHeight: number,
		) {
			if (!this.loadCurrentLineHighlight(view)) return;
			this.currentLineHighlight.style.height = `${lineHeight}px`;
			this.currentLineHighlight.style.top = `${offset}px`;
		}

		private setPadding(view: EditorView, offset: number) {
			const { isOnlyMaintainTypewriterOffsetWhenReachedEnabled } =
				view.state.facet(pluginSettingsFacet);

			const ownerSizer = view.dom.ownerDocument.querySelector(
				".workspace-leaf.mod-active .cm-sizer",
			) as HTMLElement;
			if (!ownerSizer) return;

			ownerSizer.style.padding =
				isOnlyMaintainTypewriterOffsetWhenReachedEnabled
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
