import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusShowsHeader extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"doesWritingFocusShowHeader";
	protected hasCommand = false;
	protected override toggleClass = "ptm-writing-focus-shows-header";
	protected settingTitle = "Show header in writing focus";
	protected settingDesc =
		"If enabled, the header will be shown in writing focus";
}
