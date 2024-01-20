import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class DimUnfocusedParagraphs extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isDimUnfocusedParagraphsEnabled";
	protected override toggleClass = "ptm-dim-unfocused-paragraphs";
	protected hasCommand = true;
	protected override commandTitle = "Toggle dimming unfocused paragraphs";
	protected settingTitle = "Dim unfocused paragraphs";
	protected settingDesc = "Darkens unfocused paragraphs in the editor";
}
