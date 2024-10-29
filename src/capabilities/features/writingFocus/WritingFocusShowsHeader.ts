import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusShowsHeader extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"doesWritingFocusShowHeader";
	protected override toggleClass = "ptm-writing-focus-shows-header";
	protected settingTitle = "Show header in writing focus";
	protected settingDesc =
		"If enabled, the header will be shown in writing focus";
}
