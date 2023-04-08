import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class HighlightTypewriterLineOnlyInActiveEditor extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "highlightTypewriterLineOnlyInActiveEditorEnabled";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Highlight Typewriter Line Only In Active Editor";
  protected settingDesc =
    "Highlight the typewriter line only in the active editor";

  protected override isSettingEnabled(): boolean {
    return (
      this.plugin.settings.enabled &&
      this.plugin.settings.highlightTypewriterLineEnabled
    );
  }

  override enable(): void {
    document.body.classList.add(
      "plugin-typewriter-mode-highlight-line-only-in-active-editor"
    );
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove(
      "plugin-typewriter-mode-highlight-line-only-in-active-editor"
    );
    super.disable();
  }
}
