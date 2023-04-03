import { Facet } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export const typewriterOffset = Facet.define<number, number>({
  combine: (values) => (values.length ? Math.min(...values) : 0.5),
});

export function getOffset(view: EditorView) {
  return (
    view.dom.clientHeight * view.state.facet(typewriterOffset) -
    view.defaultLineHeight / 2
  );
}
