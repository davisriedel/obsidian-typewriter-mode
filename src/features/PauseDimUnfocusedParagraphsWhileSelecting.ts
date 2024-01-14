import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class PauseDimUnfocusedParagraphsWhileSelecting extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isPauseDimUnfocusedParagraphsWhileSelectingEnabled";
	protected override toggleClass =
		"ptm-dim-unfocused-paragraphs-pause-while-selecting";
	protected requiresReload = true;
	protected hasCommand = false;
	protected settingTitle =
		"Pause dimming unfocused paragraphs while selecting text";
	protected settingDesc =
		"If this is enabled, paragraphs are not dimmed while selecting text";

	protected override isSettingEnabled(): boolean {
		return this.plugin.settings.isDimUnfocusedParagraphsEnabled;
	}
}
