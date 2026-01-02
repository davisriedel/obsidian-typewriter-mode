import type { FeatureToggle } from "../base/feature-toggle";
import { ToggleCommand } from "../base/toggle-command";

export class TogglePlugin extends ToggleCommand {
  readonly commandKey = "typewriter-mode-plugin";
  readonly commandTitle = "typewriter mode plugin";
  protected override featureToggle = this.tm.features.general
    .isPluginActivated as FeatureToggle;
}
