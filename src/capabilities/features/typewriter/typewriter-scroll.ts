import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class TypewriterScroll extends FeatureToggle {
  readonly settingKey: keyof LegacyTypewriterModeSettings =
    "isTypewriterScrollEnabled";
  protected override toggleClass = "ptm-typewriter-scroll";
  protected settingTitle = "Typewriter scrolling";
  protected settingDesc = "Turns typewriter scrolling on or off";

  protected override isSettingEnabled(): boolean {
    return !this.tm.settings.keepLinesAboveAndBelow
      .isKeepLinesAboveAndBelowEnabled;
  }
}
