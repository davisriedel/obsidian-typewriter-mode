import { pluginSettingsFacet } from "@/cm6/facets/pluginSettingsFacet";
import type { EditorView, Rect } from "@codemirror/view";
import { getEditorDom, getScrollDom } from "./selectors";

function getActiveLineProp(view: EditorView, prop: string) {
	const valueStr = view.contentDOM
		.querySelector(".cm-active.cm-line")
		?.getCssPropertyValue(prop)
		.replace("px", "");
	if (!valueStr) return null;
	return Number.parseFloat(valueStr);
}

function getActiveLineOffset(view: EditorView, caretCoords: Rect) {
	const caretOffset = caretCoords.top;

	const editorDom = getEditorDom(view);
	if (!editorDom) return 0;

	const containerOffset = editorDom.getBoundingClientRect().top;
	return caretOffset - containerOffset;
}

function getTypewriterOffset(view: EditorView) {
	const editorDom = getEditorDom(view);
	if (!editorDom) return 0;

	const percentage = view.state.facet(pluginSettingsFacet).typewriterOffset;

	return editorDom.clientHeight * percentage;
}

function getTypewriterPositionData(view: EditorView) {
	const caretCoords = view.coordsAtPos(view.state.selection.main.head);
	if (!caretCoords) return null;

	const caretHeight = caretCoords.bottom - caretCoords.top;
	const lineHeightProp = getActiveLineProp(view, "line-height");
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

	const typewriterOffset = getTypewriterOffset(view);
	const activeLineOffset = getActiveLineOffset(view, caretCoords);

	const {
		isTypewriterScrollEnabled,
		isKeepLinesAboveAndBelowEnabled,
		isOnlyMaintainTypewriterOffsetWhenReachedEnabled,
	} = view.state.facet(pluginSettingsFacet);

	const editorDom = getEditorDom(view);
	const scrollDom = getScrollDom(view);

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
		const { linesAboveAndBelow } = view.state.facet(pluginSettingsFacet);
		const lowerBound = view.defaultLineHeight * linesAboveAndBelow;
		const upperBound =
			editorDom.clientHeight -
			view.defaultLineHeight * (linesAboveAndBelow + 1);
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
		scrollOffset = getActiveLineOffset(view, caretCoords);
	}

	const result = {
		typewriterOffset,
		scrollOffset,
		activeLineOffset,
		lineHeight,
		lineOffset,
	};
	console.log(result);
	return result;
}

export type TypewriterPositionData = {
	typewriterOffset: number;
	scrollOffset: number;
	activeLineOffset: number;
	lineHeight: number;
	lineOffset: number;
};

export function measureTypewriterPosition(
	view: EditorView,
	key: string,
	write: (measure: TypewriterPositionData, view: EditorView) => void,
) {
	view.requestMeasure({
		key,
		read: (view: EditorView) => getTypewriterPositionData(view),
		write: (measure, view) => {
			if (!measure) return;
			window.requestAnimationFrame(() => {
				write(measure, view);
			});
		},
	});
}
