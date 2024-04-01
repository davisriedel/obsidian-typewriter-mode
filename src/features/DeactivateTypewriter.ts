import { Command } from "@/features/base/Command";

export class DeactivateTypewriter extends Command {
	protected commandKey = "deactivate-typewriter";
	protected commandTitle = "Deactivate typewriter scrolling";

	protected onCommand(): void {
		this.plugin.features.TypewriterScroll.toggle(false);
	}
}
