import { Facet } from "@codemirror/state";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { DEFAULT_SETTINGS } from "@/TypewriterModeSettings";

export const pluginSettingsFacet = Facet.define<
  TypewriterModeSettings,
  TypewriterModeSettings
>({
  combine: (values) => {
    if (values.length === 0) return DEFAULT_SETTINGS;
    return values[values.length - 1];
  },
});
