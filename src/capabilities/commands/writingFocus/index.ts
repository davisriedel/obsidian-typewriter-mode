// ADAPTED FROM https://github.com/ryanpcmcquen/obsidian-focus-mode

import { ToggleCommand } from "@/capabilities/base/ToggleCommand";
import { WritingFocus } from "./WritingFocus";

export class WritingFocusCommand extends ToggleCommand {
	protected override featureToggle = null;

	public readonly commandKey = "writing-focus";
	public readonly commandTitle = "writing focus";

	private writingFocus = new WritingFocus(this.tm);

	protected override onCommand(): void {
		this.writingFocus.toggleFocusMode();
	}

	protected override onEnable(): void {
		this.writingFocus.enableFocusMode();
	}

	protected override onDisable(): void {
		this.writingFocus.disableFocusMode();
	}

	async onload() {
		this.tm.plugin.addRibbonIcon(
			"enter",
			"Toggle Writing Focus",
			(_event): void => {
				this.writingFocus.toggleFocusMode();
			},
		);
	}
}
