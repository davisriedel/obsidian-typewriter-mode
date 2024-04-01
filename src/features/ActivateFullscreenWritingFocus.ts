import type { ItemView } from "obsidian";
import { FullscreenWritingFocus } from "./FullscreenWritingFocus";

export class ActivateFullscreenWritingFocus extends FullscreenWritingFocus {
protected override commandKey = "activate-fullscreen-writing-focus";
	protected override commandTitle = "Activate fullscreen writing focus";

	protected override onCommand(): void {
		const leaf = this.plugin.app.workspace.activeLeaf;
		const view = leaf.view as ItemView;
		if (view.getViewType() === "empty") return;

		if (!document.fullscreenElement) {
			this.startFullscreenWritingFocus(view);
		}

		view.containerEl.onfullscreenchange = () => {
			if (!document.fullscreenElement) this.onExitFullscreenWritingFocus();
		};
	}
}
