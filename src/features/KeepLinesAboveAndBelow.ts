import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class KeepLinesAboveAndBelow extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isKeepLinesAboveAndBelowEnabled";
	protected hasCommand = true;
	protected override commandTitle = "Toggle keeping lines above and below";
	protected settingTitle = "Keep lines above and below";
	protected settingDesc =
		"When enabled, always keeps the specified amount of lines above and below the current line in view";

	protected override isSettingEnabled(): boolean {
		return !this.plugin.settings.isTypewriterScrollEnabled;
	}
}
