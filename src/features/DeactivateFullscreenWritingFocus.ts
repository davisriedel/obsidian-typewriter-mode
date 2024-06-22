import type { ItemView } from "obsidian";
import { FullscreenWritingFocus } from "./FullscreenWritingFocus";

export class DeactivateFullscreenWritingFocus extends FullscreenWritingFocus {
protected override commandKey = "deactivate-fullscreen-writing-focus";
	protected override commandTitle = "Deactivate fullscreen writing focus";

	protected override onCommand(): void {
		const leaf = this.plugin.app.workspace.activeLeaf;
		const view = leaf.view as ItemView;
		if (view.getViewType() === "empty") return;

		if (document.fullscreenElement) {
			this.exitFullscreenWritingFocus();
		}

		view.containerEl.onfullscreenchange = () => {
			if (!document.fullscreenElement) this.onExitFullscreenWritingFocus();
		};
	}
}
