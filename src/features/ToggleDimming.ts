import { Command } from "@/features/base/Command";
import type { FeatureToggle } from "./base/FeatureToggle";

export class ToggleDimming extends Command {
	protected commandKey = "toggle-dimming";
	protected commandTitle = "Toggle dimming";

	protected onCommand(): void {
		(this.plugin.features.dimming.DimUnfocused as FeatureToggle).toggle();
	}
}
