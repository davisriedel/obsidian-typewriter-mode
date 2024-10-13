import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusShowsHeader extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"doesWritingFocusShowStatusBar";
	protected hasCommand = false;
	protected override toggleClass = "ptm-writing-focus-shows-status-bar";
	protected settingTitle = "Show status bar in writing focus";
	protected settingDesc =
		"If enabled, the status bar will be shown in writing focus";
}
