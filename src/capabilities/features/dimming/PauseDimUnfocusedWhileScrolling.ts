import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class PauseDimUnfocusedParagraphsWhileScrolling extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"isPauseDimUnfocusedWhileScrollingEnabled";
	protected override toggleClass = "ptm-dim-unfocused-pause-while-scrolling";
	protected settingTitle = "Pause dimming while scrolling";
	protected settingDesc =
		"If this is enabled, paragraphs / sentences are not dimmed while scrolling";
}
