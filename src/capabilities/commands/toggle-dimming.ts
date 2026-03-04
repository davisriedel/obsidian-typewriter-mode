import type { FeatureToggle } from "../base/feature-toggle";
import { ToggleCommand } from "../base/toggle-command";

export class ToggleDimming extends ToggleCommand {
  readonly commandKey = "dimming";
  readonly commandTitle = "dimming";
  protected featureToggle = this.tm.features.dimming[
    "dimming.isDimUnfocusedEnabled"
  ] as FeatureToggle;
}
