import { Extension } from "@codemirror/state";
import { typewriterOffset } from "@/cm-plugin/TypewriterOffset";
import { snapTypewriterOnClickEnabled } from "@/cm-plugin/SnapTypewriterOnClick";
import TypewriterScrollPaddingPlugin from "@/cm-plugin/TypewriterScrollPaddingPlugin";
import TypewriterScrollPlugin from "@/cm-plugin/TypewriterScrollPlugin";
import HighlightTypewriterLinePlugin from "@/cm-plugin/HighlightTypewriterLinePlugin";
import ZenPlugin from "@/cm-plugin/ZenPlugin";

export function codemirrorPlugin(
  options: {
    typewriterOffset?: number;
    snapTypewriterOnClickEnabled?: boolean;
  } = {}
): Extension {
  return [
    options.typewriterOffset == null
      ? []
      : typewriterOffset.of(options.typewriterOffset),
    options.snapTypewriterOnClickEnabled == null
      ? []
      : snapTypewriterOnClickEnabled.of(options.snapTypewriterOnClickEnabled),
    TypewriterScrollPaddingPlugin,
    TypewriterScrollPlugin,
    HighlightTypewriterLinePlugin,
    ZenPlugin,
  ];
}
