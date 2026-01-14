import type { FeatureToggle } from "../base/feature-toggle";
import { ToggleCommand } from "../base/toggle-command";

export class ToggleHemingwayMode extends ToggleCommand {
  readonly commandKey = "hemingway-mode";
  readonly commandTitle = "Hemingway mode";
  protected featureToggle = this.tm.features.hemingwayMode
    .isHemingwayModeEnabled as FeatureToggle;
}
