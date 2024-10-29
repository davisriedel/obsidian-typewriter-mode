import type { FeatureToggle } from "../base/FeatureToggle";
import { ToggleCommand } from "../base/ToggleCommand";

export class ToggleTypewriter extends ToggleCommand {
	public readonly commandKey = "typewriter";
	public readonly commandTitle = "typewriter scrolling";
	protected override featureToggle = this.tm.features.typewriter
		.isTypewriterScrollEnabled as FeatureToggle;
}
