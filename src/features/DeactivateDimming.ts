import { Command } from "@/features/base/Command";

export class DeactivateDimming extends Command {
	protected commandKey = "deactivate-paragraph-dimming";
	protected commandTitle = "Deactivate paragraph dimming";

	protected onCommand(): void {
		this.plugin.features.DimUnfocusedParagraphs.toggle(false);
	}
}
