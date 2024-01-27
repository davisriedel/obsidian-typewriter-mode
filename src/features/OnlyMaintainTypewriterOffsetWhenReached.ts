import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class OnlyMaintainTypewriterOffsetWhenReached extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isOnlyMaintainTypewriterOffsetWhenReachedEnabled";
	protected hasCommand = false;
	protected settingTitle = "Only maintain typewriter offset when reached";
	protected settingDesc =
		"The line that the cursor is on will not be scrolled to the center of the editor until it the specified typewriter offset is reached. This removes the additional space at the top of the editor.";

	protected override isSettingEnabled(): boolean {
		return (
			super.isSettingEnabled() && this.plugin.settings.isTypewriterScrollEnabled
		);
	}
}
