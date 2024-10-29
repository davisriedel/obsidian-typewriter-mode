import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class LimitMaxCharsPerLine extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings = "isMaxCharsPerLineEnabled";
	protected override toggleClass = "ptm-max-chars-per-line";
	public override isToggleClassPersistent = true;
	protected settingTitle = "Limit maximum number of characters per line";
	protected settingDesc = "Limits the maximum number of characters per line";
}
