import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class TogglePluginActivation extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isPluginActivated";
	protected override toggleClass = "ptm-plugin-activated";
	protected hasCommand = true;
	protected override commandTitle = "Toggle on / off";
	protected settingTitle = "Activate Typewriter Mode";
	protected settingDesc = "This enables or disables all the features below.";
}
