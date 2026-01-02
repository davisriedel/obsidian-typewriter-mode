import type { FeatureToggle } from "../base/feature-toggle";
import { ToggleCommand } from "../base/toggle-command";

export class ToggleTypewriter extends ToggleCommand {
  readonly commandKey = "typewriter";
  readonly commandTitle = "typewriter scrolling";
  protected override featureToggle = this.tm.features.typewriter
    .isTypewriterScrollEnabled as FeatureToggle;
}
