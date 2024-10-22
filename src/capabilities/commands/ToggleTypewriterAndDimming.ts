import { Command } from "../base/Command";
import type { FeatureToggle } from "../base/FeatureToggle";

export class ToggleTypewriterAndDimming extends Command {
	protected commandKey = "typewriter-scrolling-and-paragraph-dimming";
	protected commandTitle = "Toggle typewriter scrolling and paragraph dimming";

	protected onCommand(): void {
		const { isTypewriterScrollEnabled, isDimUnfocusedEnabled } =
			this.tm.settings;
		const isOn = isTypewriterScrollEnabled && isDimUnfocusedEnabled;
		(this.tm.features.typewriter.TypewriterScroll as FeatureToggle).toggle(
			!isOn,
		);
		(this.tm.features.dimming.DimUnfocused as FeatureToggle).toggle(!isOn);
	}
}
