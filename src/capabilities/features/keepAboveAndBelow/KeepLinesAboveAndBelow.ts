import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class KeepLinesAboveAndBelow extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"isKeepLinesAboveAndBelowEnabled";
	protected settingTitle = "Keep lines above and below";
	protected settingDesc =
		"When enabled, always keeps the specified amount of lines above and below the current line in view";

	protected override isSettingEnabled(): boolean {
		return !this.tm.settings.isTypewriterScrollEnabled;
	}
}
