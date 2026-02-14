import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class TypewriterScroll extends FeatureToggle {
  readonly settingKey = "typewriter.isTypewriterScrollEnabled" as const;
  protected override toggleClass = "ptm-typewriter-scroll";
  protected settingTitle = "Typewriter scrolling";
  protected settingDesc = "Turns typewriter scrolling on or off";

  protected override isSettingEnabled(): boolean {
    return !this.tm.settings.keepLinesAboveAndBelow
      .isKeepLinesAboveAndBelowEnabled;
  }
}
