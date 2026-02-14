import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type HemingwayMode from "./hemingway-mode";

export default class ShowHemingwayModeStatusBar extends FeatureToggle {
  readonly settingKey =
    "hemingwayMode.isShowHemingwayModeStatusBarEnabled" as const;
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
    const hemingwayMode = this.tm.features.hemingwayMode[
      "hemingwayMode.isHemingwayModeEnabled"
    ] as HemingwayMode;
    hemingwayMode.updateStatusBarText();
  }
}
