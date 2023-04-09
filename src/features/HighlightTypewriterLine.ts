import { FeatureToggle } from "@/features/base/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class HighlightTypewriterLine extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isHighlightTypewriterLineEnabled";
  protected override toggleClass = "ptm-highlight-line";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle Highlight Typewriter Line On/Off";
  protected settingTitle = "Highlight Typewriter Line";
  protected settingDesc =
    "Highlights the line that the typewriter is currently on in the editor";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isTypewriterScrollEnabled;
  }
}
