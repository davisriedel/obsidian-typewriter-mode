import { Command } from "@/features/base/Command";

export class DeactivateTypewriterAndDimming extends Command {
	protected commandKey = "deactivate-typewriter-scrolling-and-paragraph-dimming";
	protected commandTitle = "Deactivate typewriter scrolling and paragraph dimming";

	protected onCommand(): void {
		this.plugin.features.TypewriterScroll.toggle(false);
		this.plugin.features.DimUnfocusedParagraphs.toggle(false);
	}
}
