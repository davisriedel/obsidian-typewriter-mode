import { Command } from "@/features/base/Command";

export class ToggleDimming extends Command {
	protected commandKey = "toggle-paragraph-dimming";
	protected commandTitle = "Toggle paragraph dimming on/off";

	protected onCommand(): void {
		const { isDimUnfocusedParagraphsEnabled } = this.plugin.settings;
		this.plugin.features.DimUnfocusedParagraphs.toggle(
			!isDimUnfocusedParagraphsEnabled,
		);
	}
}
