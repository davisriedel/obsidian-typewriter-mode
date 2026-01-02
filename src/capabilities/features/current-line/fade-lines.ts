import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class FadeLines extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isFadeLinesEnabled";
  protected override toggleClass = "ptm-fade-lines";
  protected settingTitle = "Fade lines";
  protected settingDesc =
    "This places a gradient on the lines above and below the current line, making the text fade out more and more towards the top and bottom of the editor.";
}
