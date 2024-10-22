import { perWindowProps } from "@/cm6/facets/perWindowProps";
import type { PerWindowProps } from "@/cm6/facets/perWindowProps";
import { pluginSettingsFacet } from "@/cm6/facets/pluginSettingsFacet";
import type { TypewriterPositionData } from "@/cm6/utils/getTypewriterOffset";
import { measureTypewriterPosition } from "@/cm6/utils/getTypewriterOffset";
import { RangeSet } from "@codemirror/state";
import { Transaction } from "@codemirror/state";
import {
	type Decoration,
	EditorView,
	ViewPlugin,
	type ViewUpdate,
} from "@codemirror/view";
import { type App, ItemView } from "obsidian";
import { getActiveSentenceDecos } from "./utils/highlightSentence";
import { getEditorDom, getScrollDom, getSizerDom } from "./utils/selectors";

const currentLineClass = "ptm-current-line";

// these elements are a workaround, because webkit does not allow
// ::before and ::after elements to have a different mix-blend-mode than their parent
const fadeBeforeClass = "ptm-current-line-fade-before";
const fadeAfterClass = "ptm-current-line-fade-after";

class TypewriterModeCM6Plugin {
	protected app: App;
	protected view: EditorView;

	private domResizeObserver: ResizeObserver | null = null;

	private isListeningToOnScroll = false;
	private isOnScrollClassSet = false;

	private isInitialInteraction = true;
	private isRenderingAllowedUserEvent = false;
	decorations: RangeSet<Decoration> = RangeSet.empty;

	constructor(app: App, view: EditorView) {
		this.app = app;
		this.view = view;
		this.onLoad();
	}

	destroy() {
		this.domResizeObserver?.disconnect();

		this.destroyCurrentLine();

		this.removeScrollListener();

		window.removeEventListener("moveByCommand", this.moveByCommand.bind(this));
	}

	protected onLoad() {
		this.domResizeObserver = new ResizeObserver(this.onResize.bind(this));
		this.domResizeObserver.observe(this.view.dom.ownerDocument.body);

		window.addEventListener("moveByCommand", this.moveByCommand.bind(this));

		this.watchEmbeddedMarkdown();
		this.onReconfigured();
	}

	private userEventAllowed(event: string) {
		const { isTypewriterOnlyUseCommandsEnabled } =
			this.view.state.facet(pluginSettingsFacet);

		let allowed = /^(select|input|delete|undo|redo)(\..+)?$/;
		let disallowed = /^(select.pointer)$/;

		if (isTypewriterOnlyUseCommandsEnabled) {
			allowed = /^(input|delete|undo|redo)(\..+)?$/;
			disallowed = /^(select)(\..+)?$/;
		}

		return allowed.test(event) && !disallowed.test(event);
	}

	private inspectTransactions(update: ViewUpdate) {
		const userEvents = [];
		let isReconfigured = false;
		for (const tr of update.transactions) {
			if (tr.reconfigured) isReconfigured = true;

			const event = tr.annotation(Transaction.userEvent);
			if (event !== undefined) userEvents.push(event);
		}

		if (userEvents.length === 0)
			return {
				isReconfigured,
				isUserEvent: false,
				allowedUserEvents: null,
			};

		const allowedUserEvents = userEvents.reduce<boolean>((result, event) => {
			return result && this.userEventAllowed(event);
		}, userEvents.length > 0);
		return {
			isReconfigured: false,
			isUserEvent: true,
			allowedUserEvents,
		};
	}

	update(update: ViewUpdate) {
		const { isReconfigured, isUserEvent, allowedUserEvents } =
			this.inspectTransactions(update);

		if (this.isTableCell()) return;

		if (isReconfigured) this.onReconfigured();

		if (this.isDisabled()) return;

		if (!isUserEvent) {
			this.updateNonUserEvent();
			return;
		}

		allowedUserEvents
			? this.updateAllowedUserEvent()
			: this.updateDisallowedUserEvent();
	}

	private isTableCell() {
		return (
			this.view.dom.parentElement?.parentElement?.className.contains(
				"table-cell-wrapper",
			) ?? false
		);
	}

	private isMarkdownFile() {
		const view = this.app.workspace.getActiveViewOfType(ItemView);
		return view?.getViewType() === "markdown";
	}

	private isDisabledInFrontmatter() {
		const file = this.app.workspace.getActiveFile();
		if (!file) return false;
		const frontmatter = this.app.metadataCache.getFileCache(file)?.frontmatter;
		if (!frontmatter) return false;
		return !frontmatter["typewriter-mode"];
	}

	private isDisabled() {
		const { isPluginActivated } = this.view.state.facet(pluginSettingsFacet);
		if (!isPluginActivated) return true;
		if (!this.isMarkdownFile()) return true;
		if (this.isDisabledInFrontmatter()) return true;
	}

	private onReconfigured(): void {
		this.loadPerWindowProps();

		if (this.isDisabled()) {
			this.destroyCurrentLine();
			this.resetPadding(this.view);
			return;
		}

		this.updateAfterExternalEvent();
	}

	private watchEmbeddedMarkdown() {
		const selector = ".markdown-embed-content iframe.embed-iframe";
		const props = this.view.state.facet(perWindowProps);
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				[].forEach.call(mutation.addedNodes, (node: Node) => {
					if (
						node.nodeType === Node.ELEMENT_NODE &&
						(node as HTMLElement).matches(selector)
					) {
						const body = (node as HTMLIFrameElement).contentDocument?.body;
						if (!body) return;
						this.loadPerWindowPropsOnElement(props, body);
					}
				});
			});
		});
		observer.observe(this.view.dom.ownerDocument, {
			childList: true,
			subtree: true,
		});
	}

	private loadPerWindowPropsOnElement(props: PerWindowProps, el: HTMLElement) {
		// remove all classes set by this plugin
		for (const c of props.allBodyClasses) el.classList.remove(c);

		el.addClasses(props.persistentBodyClasses);
		if (!this.isDisabled()) el.addClasses(props.bodyClasses);

		el.setCssProps(props.cssVariables);
		el.setAttrs(props.bodyAttrs);
	}

	private getMarkdownBodies() {
		const embeddedMarkdownContent =
			this.view.dom.ownerDocument.querySelectorAll(
				".markdown-embed-content iframe.embed-iframe",
			);
		const embeddedMarkdownBodies: HTMLElement[] = Array.from(
			embeddedMarkdownContent,
		).flatMap((i) => {
			const body = (i as HTMLIFrameElement).contentDocument?.body;
			return body ? [body] : [];
		});
		return [this.view.dom.ownerDocument.body, ...embeddedMarkdownBodies];
	}

	private loadPerWindowProps() {
		const bodies = this.getMarkdownBodies();
		const props = this.view.state.facet(perWindowProps);
		for (const b of bodies) this.loadPerWindowPropsOnElement(props, b);
	}

	private loadCurrentLine(view: EditorView = this.view) {
		const editorDom = getEditorDom(view);
		if (!editorDom) return null;

		let currentLine = editorDom.querySelector(
			`.${currentLineClass}`,
		) as HTMLElement;

		const settings = view.state.facet(pluginSettingsFacet);

		if (!currentLine) {
			currentLine = document.createElement("div");
			currentLine.className = `${currentLineClass} ptm-current-line-highlight-${settings.currentLineHighlightStyle}`;
			editorDom.appendChild(currentLine);
		}

		if (settings.isFadeLinesEnabled) {
			let fadeBefore = editorDom.querySelector(
				`.${fadeBeforeClass}`,
			) as HTMLElement;
			let fadeAfter = editorDom.querySelector(
				`.${fadeAfterClass}`,
			) as HTMLElement;

			if (!fadeBefore) {
				fadeBefore = document.createElement("div");
				fadeBefore.className = fadeBeforeClass;
				editorDom.appendChild(fadeBefore);
			}

			if (!fadeAfter) {
				fadeAfter = document.createElement("div");
				fadeAfter.className = fadeAfterClass;
				editorDom.appendChild(fadeAfter);
			}

			return { currentLine, fadeBefore, fadeAfter };
		}

		return { currentLine };
	}

	private destroyCurrentLine(view: EditorView = this.view) {
		const editorDom = getEditorDom(view);
		if (!editorDom) return;

		const currentLine = editorDom.querySelector(
			`.${currentLineClass}`,
		) as HTMLElement;
		const fadeBefore = editorDom.querySelector(
			`.${fadeBeforeClass}`,
		) as HTMLElement;
		const fadeAfter = editorDom.querySelector(
			`.${fadeAfterClass}`,
		) as HTMLElement;

		currentLine?.remove();
		fadeBefore?.remove();
		fadeAfter?.remove();
	}

	private setupScrollListener() {
		if (this.isListeningToOnScroll) return;
		const scrollDom = getScrollDom(this.view);
		if (scrollDom) {
			scrollDom.addEventListener("scroll", this.onScroll.bind(this), {
				passive: true,
			});
			this.isListeningToOnScroll = true;
		}
	}

	private removeScrollListener() {
		if (!this.isListeningToOnScroll) return;
		const scrollDom = getScrollDom(this.view);
		if (scrollDom) {
			scrollDom.removeEventListener("scroll", this.onScroll);
			this.isListeningToOnScroll = false;
		}
	}

	private updateAllowedUserEvent() {
		this.applyDecorations();
		this.removeScrollListener();

		const editorDom = getEditorDom(this.view);
		if (editorDom) {
			editorDom.classList.remove("ptm-scroll");
			this.isOnScrollClassSet = false;

			editorDom.classList.remove("ptm-select");

			if (this.isInitialInteraction) {
				editorDom.classList.remove("ptm-first-open");
				this.isInitialInteraction = false;
			}
		}

		this.isRenderingAllowedUserEvent = true;

		measureTypewriterPosition(
			this.view,
			"TypewriterModeUpdateAfterAllowedUserEvent",
			(measure, view) => {
				if (!measure) return;
				this.recenterAndMoveCurrentLine(view, measure);
				this.isRenderingAllowedUserEvent = false;
			},
		);
	}

	private updateDisallowedUserEvent() {
		if (this.isRenderingAllowedUserEvent) return;

		const editorDom = getEditorDom(this.view);

		if (editorDom) {
			if (this.isInitialInteraction) {
				editorDom.classList.remove("ptm-first-open");
				this.isInitialInteraction = false;
			}

			editorDom.classList.add("ptm-select");
		}

		measureTypewriterPosition(
			this.view,
			"TypewriterModeUpdateAfterDisallowedUserEvent",
			(measure, view) => {
				if (!measure) return;
				const { activeLineOffset, lineHeight, lineOffset } = measure;

				const { isHighlightCurrentLineEnabled, isFadeLinesEnabled } =
					view.state.facet(pluginSettingsFacet);
				if (isHighlightCurrentLineEnabled || isFadeLinesEnabled)
					this.moveCurrentLine(view, activeLineOffset, lineOffset, lineHeight);
			},
		);
	}

	private updateNonUserEvent() {
		this.applyDecorations();

		if (!this.isInitialInteraction) return;

		const { isOnlyActivateAfterFirstInteractionEnabled } =
			this.view.state.facet(pluginSettingsFacet);

		if (isOnlyActivateAfterFirstInteractionEnabled) {
			const editorDom = getEditorDom(this.view);
			if (editorDom) editorDom.classList.add("ptm-first-open");
		}
	}

	private moveByCommand() {
		const editorDom = getEditorDom(this.view);
		if (editorDom) editorDom.classList.remove("ptm-select");
		this.updateAllowedUserEvent();
	}

	private onResize() {
		if (this.isDisabled()) return;
		this.updateAfterExternalEvent();
	}

	private onScroll() {
		measureTypewriterPosition(
			this.view,
			"TypewriterModeOnScroll",
			(measure, view) => {
				// This is placed here to debounce DOM manipulation
				if (!this.isOnScrollClassSet) {
					const editorDom = getEditorDom(this.view);
					if (editorDom) {
						editorDom.classList.add("ptm-scroll");
						this.isOnScrollClassSet = true;
					}
				}

				if (!measure) return;
				const { activeLineOffset, lineOffset, lineHeight } = measure;
				this.moveCurrentLine(view, activeLineOffset, lineOffset, lineHeight);
			},
		);
	}

	private applyDecorations() {
		const { isDimUnfocusedEnabled, dimUnfocusedMode } =
			this.view.state.facet(pluginSettingsFacet);
		if (!isDimUnfocusedEnabled || dimUnfocusedMode !== "sentences") return;

		this.decorations = getActiveSentenceDecos(this.view, {
			sentenceDelimiters: ".!?",
			extraCharacters: "*“”‘’",
			ignoredPatterns: "Mr.",
		});
	}

	private updateAfterExternalEvent() {
		if (this.isTableCell()) {
			this.destroyCurrentLine();
			return;
		}

		this.applyDecorations();

		const { isTypewriterScrollEnabled } =
			this.view.state.facet(pluginSettingsFacet);

		measureTypewriterPosition(
			this.view,
			"TypewriterModeUpdateAfterExternalEvent",
			(measure, view) => {
				this.setupScrollListener();

				if (!measure) return;

				if (isTypewriterScrollEnabled)
					this.setPadding(view, measure.typewriterOffset);

				this.recenterAndMoveCurrentLine(view, measure);
			},
		);
	}

	private moveCurrentLine(
		view: EditorView,
		offset: number,
		lineOffset: number,
		lineHeight: number,
	) {
		const result = this.loadCurrentLine(view);
		if (!result) return;

		result.currentLine.style.height = `${lineHeight}px`;
		result.currentLine.style.top = `${offset - lineOffset}px`;

		// this is a workaround, because fadeBefore.style.bottom does not work somehow...
		if (result.fadeBefore)
			result.fadeBefore.style.top = `calc(${offset - lineOffset}px - 100vh)`;
		if (result.fadeAfter)
			result.fadeAfter.style.top = `${offset - lineOffset + lineHeight}px`;
	}

	private setPadding(view: EditorView, offset: number) {
		const { isOnlyMaintainTypewriterOffsetWhenReachedEnabled } =
			view.state.facet(pluginSettingsFacet);

		const sizerDom = getSizerDom(view);
		if (!sizerDom) return;

		(sizerDom as HTMLElement).style.padding =
			isOnlyMaintainTypewriterOffsetWhenReachedEnabled
				? `0 0 ${offset}px 0`
				: `${offset}px 0`;
	}

	private resetPadding(view: EditorView) {
		if (!this.isMarkdownFile()) return;
		const sizerDom = getSizerDom(view);
		if (!sizerDom) return;
		(sizerDom as HTMLElement).style.padding = "var(--file-margins)";
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

	private recenterAndMoveCurrentLine(
		view: EditorView,
		{ scrollOffset, lineOffset, lineHeight }: TypewriterPositionData,
	) {
		const {
			isTypewriterScrollEnabled,
			isKeepLinesAboveAndBelowEnabled,
			isHighlightCurrentLineEnabled,
			isFadeLinesEnabled,
		} = view.state.facet(pluginSettingsFacet);
		if (isTypewriterScrollEnabled || isKeepLinesAboveAndBelowEnabled)
			this.recenter(view, scrollOffset);
		if (isHighlightCurrentLineEnabled || isFadeLinesEnabled)
			this.moveCurrentLine(view, scrollOffset, lineOffset, lineHeight);
	}
}

export default function createTypewriterModeViewPlugin(app: App) {
	return ViewPlugin.define(
		(view: EditorView) => {
			return new TypewriterModeCM6Plugin(app, view);
		},
		{ decorations: (v) => v.decorations },
	);
}
