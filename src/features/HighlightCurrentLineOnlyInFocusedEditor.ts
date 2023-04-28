import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class HighlightCurrentLineOnlyInFocusedEditor extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isHighlightCurrentLineOnlyInFocusedEditorEnabled";
  protected override toggleClass =
    "ptm-highlight-current-line-only-in-active-editor";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Highlight Current Line Only In Focused Note";
  protected settingDesc =
    "Only show highlighted line in the note your cursor is on (e.g. if you have multiple notes open in split panes)";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isHighlightCurrentLineEnabled;
  }
}
