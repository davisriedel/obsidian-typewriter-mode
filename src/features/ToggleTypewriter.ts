import { Command } from "@/features/base/Command";

export class ToggleTypewriter extends Command {
	protected commandKey = "toggle-typewriter";
	protected commandTitle = "Toggle typewriter scrolling";

	protected onCommand(): void {
		const { isTypewriterScrollEnabled } = this.plugin.settings;
		this.plugin.features.TypewriterScroll.toggle(!isTypewriterScrollEnabled);
	}
}
