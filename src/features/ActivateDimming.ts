import { Command } from "@/features/base/Command";

export class ActivateDimming extends Command {
	protected commandKey = "activate-paragraph-dimming";
	protected commandTitle = "Activate paragraph dimming";

	protected onCommand(): void {
		this.plugin.features.DimUnfocusedParagraphs.toggle(true);
	}
}
