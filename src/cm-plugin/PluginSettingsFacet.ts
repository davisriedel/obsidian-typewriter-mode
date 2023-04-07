import { Facet } from "@codemirror/state";
import {
  DEFAULT_SETTINGS,
  TypewriterModeSettings,
} from "@/TypewriterModeSettings";

export const pluginSettingsFacet = Facet.define<
  TypewriterModeSettings,
  TypewriterModeSettings
>({
  combine: (values) => {
    if (values.length === 0) return DEFAULT_SETTINGS;
    return {
      enabled: values[0].enabled,
      zenEnabled: values[0].zenEnabled,
      zenOnlyInActiveEditorEnabled: values[0].zenOnlyInActiveEditorEnabled,
      highlightTypewriterLineEnabled: values[0].highlightTypewriterLineEnabled,
      highlightTypewriterLineOnlyInActiveEditorEnabled:
        values[0].highlightTypewriterLineOnlyInActiveEditorEnabled,
      pauseZenWhileScrollingEnabled: values[0].pauseZenWhileScrollingEnabled,
      pauseZenWhileSelectingEnabled: values[0].pauseZenWhileSelectingEnabled,

      typewriterOffset: Math.min(...values.map((v) => v.typewriterOffset)),
      zenOpacity: Math.min(...values.map((v) => v.zenOpacity)),

      typewriterLineHighlightColor: values[0].typewriterLineHighlightColor,
      typewriterLineHighlightStyle: values[0].typewriterLineHighlightStyle,
      typewriterLineHighlightUnderlineThickness: Math.min(
        ...values.map((v) => v.typewriterLineHighlightUnderlineThickness)
      ),
    };
  },
});
