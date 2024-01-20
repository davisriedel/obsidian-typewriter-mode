import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class HighlightCurrentLine extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isHighlightCurrentLineEnabled";
	protected override toggleClass = "ptm-highlight-current-line";
	protected hasCommand = true;
	protected override commandTitle = "Toggle highlight current line";
	protected settingTitle = "Highlight current line";
	protected settingDesc = "Highlights the line that the cursor is currently on";
}
