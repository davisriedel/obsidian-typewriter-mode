import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";
import type HemingwayMode from "./hemingway-mode";

export default class ShowHemingwayModeStatusBar extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isShowHemingwayModeStatusBarEnabled";
  protected override toggleClass = null;
  protected settingTitle = "Show status bar indicator";
  protected settingDesc =
    "Shows an indicator in the status bar when Hemingway mode is active.";

  override enable() {
    super.enable();
    this.updateHemingwayModeStatusBar();
  }

  override disable() {
    super.disable();
    this.updateHemingwayModeStatusBar();
  }

  private updateHemingwayModeStatusBar() {
    const hemingwayMode = this.tm.features.hemingwayMode
      .isHemingwayModeEnabled as HemingwayMode;
    hemingwayMode.updateStatusBarText();
  }
}
