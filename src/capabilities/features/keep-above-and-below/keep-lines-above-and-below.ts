import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class KeepLinesAboveAndBelow extends FeatureToggle {
  readonly settingKey =
    "keepLinesAboveAndBelow.isKeepLinesAboveAndBelowEnabled" as const;
  protected settingTitle = "Keep lines above and below";
  protected settingDesc =
    "When enabled, always keeps the specified amount of lines above and below the current line in view";

  protected override isSettingEnabled(): boolean {
    return !this.tm.settings.typewriter.isTypewriterScrollEnabled;
  }
}
