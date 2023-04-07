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
      highlightTypewriterLineEnabled: values[0].highlightTypewriterLineEnabled,
      pauseZenWhileScrollingEnabled: values[0].pauseZenWhileScrollingEnabled,

      typewriterOffset: Math.min(...values.map((v) => v.typewriterOffset)),
      zenOpacity: Math.min(...values.map((v) => v.zenOpacity)),

      typewriterLineHighlightColor: values[0].typewriterLineHighlightColor,
      typewriterLineHighlightStyle: values[0].typewriterLineHighlightStyle,
    };
  },
});
