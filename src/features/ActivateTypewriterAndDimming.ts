import { Command } from "@/features/base/Command";

export class ActivateTypewriterAndDimming extends Command {
	protected commandKey = "activate-typewriter-scrolling-and-paragraph-dimming";
	protected commandTitle = "Activate typewriter scrolling and paragraph dimming";

	protected onCommand(): void {
		this.plugin.features.TypewriterScroll.toggle(true);
		this.plugin.features.DimUnfocusedParagraphs.toggle(true);
	}
}
