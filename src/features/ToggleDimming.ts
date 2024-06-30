import { Command } from "@/features/base/Command";
import type { FeatureToggle } from "./base/FeatureToggle";

export class ToggleDimming extends Command {
	protected commandKey = "toggle-paragraph-dimming";
	protected commandTitle = "Toggle paragraph dimming";

	protected onCommand(): void {
		const { isDimUnfocusedParagraphsEnabled } = this.plugin.settings;
		(
			this.plugin.features.typewriter.DimUnfocusedParagraphs as FeatureToggle
		).toggle(!isDimUnfocusedParagraphsEnabled);
	}
}
