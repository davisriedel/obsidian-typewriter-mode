import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class LimitMaxCharsPerLine extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isMaxCharsPerLineEnabled";
  protected override toggleClass = "ptm-max-chars-per-line";
  override isToggleClassPersistent = true;
  protected settingTitle = "Limit maximum number of characters per line";
  protected settingDesc = "Limits the maximum number of characters per line";
}
