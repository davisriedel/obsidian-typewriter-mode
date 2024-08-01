import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class PauseDimUnfocusedParagraphsWhileScrolling extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isPauseDimUnfocusedWhileScrollingEnabled";
	protected override toggleClass = "ptm-dim-unfocused-pause-while-scrolling";
	protected hasCommand = false;
	protected settingTitle = "Pause dimming while scrolling";
	protected settingDesc =
		"If this is enabled, paragraphs / sentences are not dimmed while scrolling";
}
