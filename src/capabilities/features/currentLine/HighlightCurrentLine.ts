import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class HighlightCurrentLine extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"isHighlightCurrentLineEnabled";
	protected override toggleClass = "ptm-highlight-current-line";
	protected settingTitle = "Highlight current line";
	protected settingDesc = "Highlights the line that the cursor is currently on";
}
