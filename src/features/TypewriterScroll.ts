import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class TypewriterScroll extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings = "isTypewriterScrollEnabled";
  protected override toggleClass = "ptm-typewriter-scroll";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle typewriter scrolling";
  protected settingTitle = "Typewriter scrolling";
  protected settingDesc = "Turns typewriter scrolling on or off";

  protected override isSettingEnabled(): boolean {
    return !this.plugin.settings.isKeepLinesAboveAndBelowEnabled;
  }
}
