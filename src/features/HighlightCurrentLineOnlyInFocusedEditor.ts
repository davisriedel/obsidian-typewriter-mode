import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class HighlightCurrentLineOnlyInFocusedEditor extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isHighlightCurrentLineOnlyInFocusedEditorEnabled";
	protected override toggleClass =
		"ptm-highlight-current-line-only-in-active-editor";
	protected hasCommand = false;
	protected settingTitle = "Highlight current line only in focused note";
	protected settingDesc =
		"Only show highlighted line in the note your cursor is on (e.g. if you have multiple notes open in split panes)";

	protected override isSettingEnabled(): boolean {
		return (
			super.isSettingEnabled() &&
			this.plugin.settings.isHighlightCurrentLineEnabled
		);
	}
}
