import type { FeatureToggle } from "../base/FeatureToggle";
import { ToggleCommand } from "../base/ToggleCommand";

export class TogglePlugin extends ToggleCommand {
	public readonly commandKey = "typewriter-mode-plugin";
	public readonly commandTitle = "typewriter mode plugin";
	protected override featureToggle = this.tm.features.general
		.isPluginActivated as FeatureToggle;
}
