import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class KeepLinesAboveAndBelow extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isKeepLinesAboveAndBelowEnabled";
  protected settingTitle = "Keep lines above and below";
  protected settingDesc =
    "When enabled, always keeps the specified amount of lines above and below the current line in view";

  protected override isSettingEnabled(): boolean {
    return !this.tm.settings.typewriter.isTypewriterScrollEnabled;
  }
}
