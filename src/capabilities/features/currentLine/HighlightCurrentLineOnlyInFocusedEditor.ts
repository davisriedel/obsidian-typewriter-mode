import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class HighlightCurrentLineOnlyInFocusedEditor extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isHighlightCurrentLineOnlyInFocusedEditorEnabled";
	protected override toggleClass =
		"ptm-highlight-current-line-only-in-active-editor";
	protected hasCommand = false;
	protected settingTitle = "Highlight current line only in focused note";
	protected settingDesc =
		"Only show highlighted line in the note your cursor is on (e.g. if you have multiple notes open in split panes)";
}
