import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class DimUnfocusedParagraphs extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isDimUnfocusedParagraphsEnabled";
  protected override toggleClass = "ptm-dim-unfocused-paragraphs";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle dimming unfocused paragraphs";
  protected settingTitle = "Dim unfocused paragraphs";
  protected settingDesc = "Darkens unfocused paragraphs in the editor";
}
