import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type HemingwayMode from "./hemingway-mode";

export default class HemingwayModeOnlyInWritingFocusMode extends FeatureToggle {
  readonly settingKey =
    "hemingwayMode.isHemingwayModeOnlyInWritingFocusModeEnabled" as const;
  protected override toggleClass = null;
  protected hasCommand = false;
  protected settingTitle = "Hemingway mode only in writing focus mode";
  protected settingDesc =
    "Only enforce Hemingway mode when writing focus mode is active";

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
