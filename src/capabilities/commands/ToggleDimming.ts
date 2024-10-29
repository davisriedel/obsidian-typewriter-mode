import type { FeatureToggle } from "../base/FeatureToggle";
import { ToggleCommand } from "../base/ToggleCommand";

export class ToggleDimming extends ToggleCommand {
	public readonly commandKey = "dimming";
	public readonly commandTitle = "dimming";
	protected featureToggle = this.tm.features.dimming
		.isDimUnfocusedEnabled as FeatureToggle;
}
