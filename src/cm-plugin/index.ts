import { Extension } from "@codemirror/state";
import { typewriterOffset } from "@/cm-plugin/TypewriterOffset";
import TypewriterScrollPaddingPlugin from "@/cm-plugin/TypewriterScrollPaddingPlugin";
import TypewriterScrollPlugin from "@/cm-plugin/TypewriterScrollPlugin";
import ResetTypewriterScrollPaddingPlugin from "@/cm-plugin/ResetTypewriterScrollPaddingPlugin";
import HighlightTypewriterLinePlugin from "@/cm-plugin/HighlightTypewriterLinePlugin";
import ZenPlugin from "@/cm-plugin/ZenPlugin";

export function typewriterScroll(
  options: { typewriterOffset?: number } = {}
): Extension {
  return [
    options.typewriterOffset == null
      ? []
      : typewriterOffset.of(options.typewriterOffset),
    TypewriterScrollPaddingPlugin,
    TypewriterScrollPlugin,
    HighlightTypewriterLinePlugin,
    ZenPlugin,
  ];
}

export function resetTypewriterScroll(): Extension {
  return [ResetTypewriterScrollPaddingPlugin];
}
