import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class TypewriterScroll extends FeatureToggle {
	public readonly settingKey: keyof TypewriterModeSettings =
		"isTypewriterScrollEnabled";
	protected override toggleClass = "ptm-typewriter-scroll";
	protected settingTitle = "Typewriter scrolling";
	protected settingDesc = "Turns typewriter scrolling on or off";

	protected override isSettingEnabled(): boolean {
		return !this.tm.settings.isKeepLinesAboveAndBelowEnabled;
	}
}
