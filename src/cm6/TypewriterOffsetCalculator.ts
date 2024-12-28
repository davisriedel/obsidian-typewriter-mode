import type TypewriterModeLib from "@/lib";
import type { EditorView, Rect } from "@codemirror/view";
import { getEditorDom, getScrollDom } from "./selectors";

export class TypewriterOffsetCalculator {
	protected tm: TypewriterModeLib;
	protected view: EditorView;

	constructor(tm: TypewriterModeLib, view: EditorView) {
		this.tm = tm;
		this.view = view;
	}

	getActiveLineProp(prop: string) {
		const valueStr = this.view.contentDOM
			.querySelector(".cm-active.cm-line")
			?.getCssPropertyValue(prop)
			.replace("px", "");
		if (!valueStr) return null;
		return Number.parseFloat(valueStr);
	}

	getActiveLineOffset(caretCoords: Rect) {
		const caretOffset = caretCoords.top;

		const editorDom = getEditorDom(this.view);
		if (!editorDom) return 0;

		const containerOffset = editorDom.getBoundingClientRect().top;
		return caretOffset - containerOffset;
	}

	getTypewriterOffset() {
		const editorDom = getEditorDom(this.view);
		if (!editorDom) return 0;

		return editorDom.clientHeight * this.tm.settings.typewriterOffset;
	}

	getTypewriterPositionData() {
		const caretCoords = this.view.coordsAtPos(
			this.view.state.selection.main.head,
		);
		if (!caretCoords) return null;

		const caretHeight = caretCoords.bottom - caretCoords.top;
		const lineHeightProp = this.getActiveLineProp("line-height");
		if (!lineHeightProp) return null;

		let lineHeight = 0;
		let lineOffset = 0;
		if (caretHeight > lineHeightProp) {
			lineHeight = caretHeight;
			lineOffset = 0;
		} else {
			lineHeight = lineHeightProp;
			lineOffset = (lineHeight - caretHeight) / 2;
		}

		const typewriterOffset = this.getTypewriterOffset();
		const activeLineOffset = this.getActiveLineOffset(caretCoords);

		const {
			isTypewriterScrollEnabled,
			isKeepLinesAboveAndBelowEnabled,
			isOnlyMaintainTypewriterOffsetWhenReachedEnabled,
		} = this.tm.settings;

		const editorDom = getEditorDom(this.view);
		const scrollDom = getScrollDom(this.view);

		let scrollOffset: number;
		if (!editorDom || !scrollDom) {
			scrollOffset = 0;
		} else if (isTypewriterScrollEnabled) {
			scrollOffset = typewriterOffset;
			if (isOnlyMaintainTypewriterOffsetWhenReachedEnabled) {
				if (activeLineOffset < 0) scrollOffset = 0;
				else {
					scrollOffset =
						scrollDom.scrollTop + activeLineOffset < typewriterOffset
							? Math.min(typewriterOffset, activeLineOffset)
							: typewriterOffset;
				}
			}
		} else if (isKeepLinesAboveAndBelowEnabled) {
			const { linesAboveAndBelow } = this.tm.settings;
			const lowerBound = this.view.defaultLineHeight * linesAboveAndBelow;
			const upperBound =
				editorDom.clientHeight -
				this.view.defaultLineHeight * (linesAboveAndBelow + 1);
			const belowLowerBound =
				scrollDom.scrollTop !== 0 && activeLineOffset < lowerBound;
			const aboveUpperBound = activeLineOffset > upperBound;
			if (belowLowerBound) {
				scrollOffset = lowerBound;
			} else if (aboveUpperBound) {
				scrollOffset = upperBound;
			} else {
				scrollOffset = activeLineOffset;
			}
		} else {
			scrollOffset = this.getActiveLineOffset(caretCoords);
		}

		return {
			typewriterOffset,
			scrollOffset,
			activeLineOffset,
			lineHeight,
			lineOffset,
		};
	}
}

export type TypewriterPositionData = {
	typewriterOffset: number;
	scrollOffset: number;
	activeLineOffset: number;
	lineHeight: number;
	lineOffset: number;
};
