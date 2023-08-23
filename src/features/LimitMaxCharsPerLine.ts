import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class LimitMaxCharsPerLine extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings = "isMaxCharsPerLineEnabled";
  protected override toggleClass = "ptm-max-chars-per-line";
  protected requiresReload = false;
  protected hasCommand = true;
  protected override commandTitle =
    "Toggle maximum number of characters per line";
  protected settingTitle = "Limit maximum number of characters per line";
  protected settingDesc = "Limits the maximum number of characters per line";
}
