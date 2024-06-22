import { Command } from "@/features/base/Command";

export class ActivateTypewriter extends Command {
	protected commandKey = "activate-typewriter";
	protected commandTitle = "Activate typewriter scrolling";

	protected onCommand(): void {
		this.plugin.features.TypewriterScroll.toggle(true);
	}
}
