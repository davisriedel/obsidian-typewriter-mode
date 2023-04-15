import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class HighlightTypewriterLineOnlyInFocusedEditor extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isHighlightTypewriterLineOnlyInFocusedEditorEnabled";
  protected override toggleClass = "ptm-highlight-line-only-in-active-editor";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Highlight Typewriter Line Only In Focused Editor";
  protected settingDesc =
    "Highlight the typewriter line only in the focused editor";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isHighlightTypewriterLineEnabled;
  }
}
