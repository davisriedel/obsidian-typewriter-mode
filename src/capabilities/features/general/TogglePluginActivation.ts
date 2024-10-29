import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class TogglePluginActivation extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings = "isPluginActivated";
	protected override toggleClass = "ptm-plugin-activated";
	protected settingTitle = "Activate Typewriter Mode";
	protected settingDesc = "This enables or disables all the features below.";
}
