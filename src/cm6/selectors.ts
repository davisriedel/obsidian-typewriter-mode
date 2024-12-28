import type { EditorView } from "@codemirror/view";

export function getEditorDom(view: EditorView) {
	return view.dom.ownerDocument.querySelector(
		".workspace-leaf.mod-active .cm-editor, .mod-inside-iframe .cm-editor",
	) as HTMLElement;
}

export function getScrollDom(view: EditorView) {
	return view.dom.ownerDocument.querySelector(
		".workspace-leaf.mod-active .cm-scroller, .mod-inside-iframe .cm-scroller",
	) as HTMLElement;
}

export function getSizerDom(view: EditorView) {
	return view.dom.ownerDocument.querySelector(
		".workspace-leaf.mod-active .cm-sizer, .mod-inside-iframe .cm-sizer",
	) as HTMLElement;
}
