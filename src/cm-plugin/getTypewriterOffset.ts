import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import type { EditorView } from "@codemirror/view";
import { getEditorDom, getScrollDom } from "./selectors";

function getActiveLineProp(view: EditorView, prop: string) {
	return parseFloat(
		view.contentDOM
			.querySelector(".cm-active.cm-line")
			?.getCssPropertyValue(prop)
			.replace("px", ""),
	);
}

function getActiveLineOffset(view: EditorView) {
	const caretOffset =
		view.coordsAtPos(view.state.selection.main.head)?.top ?? 0;

	const editorDom = getEditorDom(view);
	if (!editorDom) return 0;

	const containerOffset = editorDom.getBoundingClientRect().top;
	return caretOffset - containerOffset;
}

function getTypewriterOffset(view: EditorView, lineHeight: number) {
	const editorDom = getEditorDom(view);
	if (!editorDom) return 0;

	const fontSize = getActiveLineProp(view, "font-size");
	const percentage = view.state.facet(pluginSettingsFacet).typewriterOffset;

	const editorOffset = editorDom.clientHeight * percentage;
	const lineOffset = (lineHeight - fontSize) / 2;
	return editorOffset - lineOffset;
}

function getTypewriterPositionData(view: EditorView) {
	const lineHeight = getActiveLineProp(view, "line-height");
	const typewriterOffset = getTypewriterOffset(view, lineHeight);
	const activeLineOffset = getActiveLineOffset(view);

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
			scrollOffset =
				scrollDom.scrollTop + activeLineOffset < typewriterOffset
					? Math.min(typewriterOffset, activeLineOffset)
					: typewriterOffset;
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
		scrollOffset = getActiveLineOffset(view);
	}

	return {
		typewriterOffset,
		scrollOffset,
		activeLineOffset,
		lineHeight,
	};
}

export type TypewriterPositionData = ReturnType<
	typeof getTypewriterPositionData
>;

export function measureTypewriterPosition(
	view: EditorView,
	key: string,
	write: (measure: TypewriterPositionData, view: EditorView) => void,
) {
	view.requestMeasure({
		key,
		read: (view: EditorView) => getTypewriterPositionData(view),
		write: (measure, view) => {
			window.requestAnimationFrame(() => {
				write(measure, view);
			});
		},
	});
}
