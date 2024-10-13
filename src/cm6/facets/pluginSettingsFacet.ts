import {
	DEFAULT_SETTINGS,
	type TypewriterModeSettings,
} from "@/capabilities/settings";
import { Facet } from "@codemirror/state";

export const pluginSettingsFacet = Facet.define<
	TypewriterModeSettings,
	TypewriterModeSettings
>({
	combine: (values) => {
		if (values.length === 0) return DEFAULT_SETTINGS;
		return values[values.length - 1];
	},
});
