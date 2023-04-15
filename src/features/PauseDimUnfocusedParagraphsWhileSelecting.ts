import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class PauseDimUnfocusedParagraphsWhileSelecting extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isPauseDimUnfocusedParagraphsWhileSelectingEnabled";
  protected override toggleClass =
    "ptm-dim-unfocused-paragraphs-pause-while-selecting";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle =
    "Pause Dimming Unfocused Paragraphs While Selecting Text";
  protected settingDesc = "Paragraphs are not dimmed while selecting text";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isDimUnfocusedParagraphsEnabled;
  }
}
