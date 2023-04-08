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
    return values[values.length - 1];
  },
});
