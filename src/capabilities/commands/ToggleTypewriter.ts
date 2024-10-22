import { Command } from "../base/Command";
import type { FeatureToggle } from "../base/FeatureToggle";

export class ToggleTypewriter extends Command {
	protected commandKey = "toggle-typewriter";
	protected commandTitle = "Toggle typewriter scrolling";

	protected onCommand(): void {
		const { isTypewriterScrollEnabled } = this.tm.settings;
		(this.tm.features.typewriter.TypewriterScroll as FeatureToggle).toggle(
			!isTypewriterScrollEnabled,
		);
	}
}
