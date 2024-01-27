import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class TogglePluginActivation extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isPluginActivated";
	protected override toggleClass = "ptm-plugin-activated";
	protected hasCommand = true;
	protected override commandTitle = "Toggle Typewriter Mode Plugin On / Off";
	protected settingTitle = "Activate Typewriter Mode Plugin";
	protected settingDesc =
		"This enables or disables all features of the plugin.";

	protected override isSettingEnabled(): boolean {
		return true;
	}
}
