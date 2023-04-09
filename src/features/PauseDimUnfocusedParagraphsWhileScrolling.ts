import { FeatureToggle } from "@/features/base/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class PauseDimUnfocusedParagraphsWhileScrolling extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isPauseDimUnfocusedParagraphsWhileScrollingEnabled";
  protected override toggleClass =
    "ptm-dim-unfocused-paragraphs-pause-while-scrolling";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle = "Pause Dimming Unfocused Paragraphs While Scrolling";
  protected settingDesc = "Paragraphs are not dimmed while scrolling";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isDimUnfocusedParagraphsEnabled;
  }
}
