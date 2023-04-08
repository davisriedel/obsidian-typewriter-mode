import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class LimitMaxCharsPerLine extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings = "maxCharsPerLineEnabled";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Limit Maximum Number of Characters Per Line";
  protected settingDesc = "Limits the maximum number of characters per line";

  override enable(): void {
    document.body.classList.add("plugin-typewriter-mode-max-chars-per-line");
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove("plugin-typewriter-mode-max-chars-per-line");
    super.disable();
  }
}
