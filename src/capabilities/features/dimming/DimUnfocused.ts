import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class DimUnfocused extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings = "isDimUnfocusedEnabled";
	protected override toggleClass = "ptm-dim-unfocused";
	protected settingTitle = "Dim unfocused";
	protected settingDesc = "Dim unfocused paragraphs / sentences";
}
