import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class DimUnfocused extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isDimUnfocusedEnabled";
	protected override toggleClass = "ptm-dim-unfocused";
	protected hasCommand = true;
	protected override commandTitle = "Toggle dimming";
	protected settingTitle = "Dim unfocused";
	protected settingDesc = "Dim unfocused paragraphs / sentences";
}
