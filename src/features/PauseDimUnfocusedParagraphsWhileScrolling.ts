import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class PauseDimUnfocusedParagraphsWhileScrolling extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isPauseDimUnfocusedParagraphsWhileScrollingEnabled";
	protected override toggleClass =
		"ptm-dim-unfocused-paragraphs-pause-while-scrolling";
	protected hasCommand = false;
	protected settingTitle = "Pause dimming unfocused paragraphs while scrolling";
	protected settingDesc =
		"If this is enabled, paragraphs are not dimmed while scrolling";

	protected override isSettingEnabled(): boolean {
		return this.plugin.settings.isDimUnfocusedParagraphsEnabled;
	}
}
