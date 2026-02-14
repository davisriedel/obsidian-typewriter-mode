import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class LimitMaxCharsPerLine extends FeatureToggle {
  readonly settingKey = "maxChars.isMaxCharsPerLineEnabled" as const;
  protected override toggleClass = "ptm-max-chars-per-line";
  override isToggleClassPersistent = true;
  protected settingTitle = "Limit maximum number of characters per line";
  protected settingDesc = "Limits the maximum number of characters per line";
}
