import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class WritingFocusShowsHeader extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"doesWritingFocusShowHeader";
	protected hasCommand = false;
	protected settingTitle = "Show header in writing focus";
	protected settingDesc =
		"If enabled, the header will be shown in writing focus";

	protected override isSettingEnabled(): boolean {
		return true;
	}
}
