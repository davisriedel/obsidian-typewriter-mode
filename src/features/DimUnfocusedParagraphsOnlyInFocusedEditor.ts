import { FeatureToggle } from "@/features/base/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class DimUnfocusedParagraphsOnlyInFocusedEditor extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isDimUnfocusedParagraphsOnlyInFocusedEditorEnabled";
  protected override toggleClass =
    "ptm-dim-unfocused-paragraphs-only-in-active-editor";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Dim Unfocused Paragraphs Only In Focused Editor";
  protected settingDesc =
    "Do not dim unfocused paragraphs in unfocused editors";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isDimUnfocusedParagraphsEnabled;
  }
}
