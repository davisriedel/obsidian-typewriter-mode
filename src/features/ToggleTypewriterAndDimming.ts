import { Command } from "@/features/base/Command";
import type { FeatureToggle } from "./base/FeatureToggle";

export class ToggleTypewriterAndDimming extends Command {
	protected commandKey = "typewriter-scrolling-and-paragraph-dimming";
	protected commandTitle = "Toggle typewriter scrolling and paragraph dimming";

	protected onCommand(): void {
		const { isTypewriterScrollEnabled, isDimUnfocusedParagraphsEnabled } =
			this.plugin.settings;
		const isOn = isTypewriterScrollEnabled && isDimUnfocusedParagraphsEnabled;
		(this.plugin.features.typewriter.TypewriterScroll as FeatureToggle).toggle(
			!isOn,
		);
		(
			this.plugin.features.typewriter.DimUnfocusedParagraphs as FeatureToggle
		).toggle(!isOn);
	}
}
