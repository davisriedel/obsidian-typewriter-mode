import type { FeatureToggle } from "../base/feature-toggle";
import { ToggleCommand } from "../base/toggle-command";

export class ToggleMaxCharsPerLine extends ToggleCommand {
  readonly commandKey = "max-chars-per-line";
  readonly commandTitle = "limit maximum characters per line";
  protected featureToggle = this.tm.features.maxChar[
    "maxChars.isMaxCharsPerLineEnabled"
  ] as FeatureToggle;
}
