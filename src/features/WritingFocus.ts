// ADAPTED FROM https://github.com/ryanpcmcquen/obsidian-focus-mode

import { Command } from "@/features/base/Command";
import type { ItemView } from "obsidian";

import * as remote from "@electron/remote";

export class WritingFocus extends Command {
	protected commandKey = "writing-focus";
	protected commandTitle = "Toggle writing focus";

	private focusModeActive = false;

	private readonly maximizedClass = "ptm-maximized";
	private readonly focusModeClass = "ptm-focus-mode";
	private readonly hideHeaderClass = "ptm-writing-focus-no-header";

	private readonly vignetteElClass = "ptm-writing-focus-vignette-element";
	private readonly vignetteStyleAttr = "data-ptm-writing-focus-vignette-style";

	private leftSplitCollapsed: boolean;
	private rightSplitCollapsed: boolean;

	private prevWindowSize = 0;
	private prevWasFullscreen = false;

	protected onCommand(): void {
		this.toggleFocusMode();
	}

	private addVignette(view: ItemView) {
		const vignetteEl = this.plugin.settings.doesWritingFocusShowHeader
			? view.containerEl
			: view.contentEl;

		vignetteEl.classList.add(this.vignetteElClass);
		vignetteEl.setAttr(
			this.vignetteStyleAttr,
			this.plugin.settings.writingFocusVignetteStyle,
		);
	}

	private removeVignette(view: ItemView) {
		const vignetteEl = this.plugin.settings.doesWritingFocusShowHeader
			? view.containerEl
			: view.contentEl;

		vignetteEl.removeAttribute(this.vignetteStyleAttr);
		vignetteEl.classList.remove(this.vignetteElClass);
	}

	private startFullscreen() {
		const currentWindow = remote.getCurrentWindow();
		this.prevWasFullscreen = currentWindow.isFullScreen();
		currentWindow.setFullScreen(true);
	}

	private exitFullscreen() {
		if (this.prevWasFullscreen) return;
		const currentWindow = remote.getCurrentWindow();
		currentWindow.setFullScreen(false);
	}

	private onExitFullscreenWritingFocus(view: ItemView) {
		if (this.focusModeActive) this.disableFocusMode(view);
	}

	storeSplitsValues() {
		this.leftSplitCollapsed = this.plugin.app.workspace.leftSplit.collapsed;
		this.rightSplitCollapsed = this.plugin.app.workspace.rightSplit.collapsed;
	}

	collapseSplits() {
		this.plugin.app.workspace.leftSplit.collapse();
		this.plugin.app.workspace.rightSplit.collapse();
	}

	restoreSplits() {
		if (!this.leftSplitCollapsed) this.plugin.app.workspace.leftSplit.expand();
		if (!this.rightSplitCollapsed)
			this.plugin.app.workspace.rightSplit.expand();
	}

	removeExtraneousClasses() {
		if (this.plugin.app.workspace.containerEl.hasClass(this.maximizedClass)) {
			this.plugin.app.workspace.containerEl.removeClass(this.maximizedClass);
		}

		if (document.body.classList.contains(this.focusModeClass)) {
			document.body.classList.remove(this.focusModeClass);
		}
		if (document.body.classList.contains(this.hideHeaderClass)) {
			document.body.classList.remove(this.hideHeaderClass);
		}
	}

	enableFocusMode(view: ItemView) {
		this.focusModeActive = true;

		if (!document.body.classList.contains(this.focusModeClass)) {
			this.storeSplitsValues();
		}

		this.collapseSplits();

		this.plugin.app.workspace.containerEl.toggleClass(
			this.maximizedClass,
			!this.plugin.app.workspace.containerEl.hasClass(this.maximizedClass),
		);

		document.body.classList.toggle(
			this.focusModeClass,
			!document.body.classList.contains(this.focusModeClass),
		);

		if (!this.plugin.settings.doesWritingFocusShowHeader) {
			document.body.classList.toggle(
				this.hideHeaderClass,
				!document.body.classList.contains(this.hideHeaderClass),
			);
		}

		if (document.body.classList.contains(this.focusModeClass)) {
			Array.from(
				document.querySelectorAll(`.${this.focusModeClass} .workspace-split`),
			).forEach((node) => {
				const theNode = node as HTMLElement;
				const hasActiveKids = theNode.querySelector(".mod-active");
				if (hasActiveKids) {
					theNode.style.display = "flex";
				} else {
					theNode.style.display = "none";
				}
			});
		}

		if (this.plugin.settings.doesWritingFocusShowVignette)
			this.addVignette(view);

		if (this.plugin.settings.isWritingFocusFullscreen) {
			this.startFullscreen();
			const self = this;
			function onResize() {
				const currentWindowSize = window.innerWidth;
				if (self.prevWindowSize > currentWindowSize) {
					if (!document.fullscreenElement) {
						self.onExitFullscreenWritingFocus(view);
						document.body.removeEventListener("resize", this);
						self.prevWindowSize = 0;
					}
				} else {
					self.prevWindowSize = currentWindowSize;
				}
			}
			document.body.onresize = onResize;
		}
	}

	disableFocusMode(view: ItemView) {
		this.removeExtraneousClasses();

		if (document.body.classList.contains(this.focusModeClass)) {
			document.body.classList.remove(this.focusModeClass);
		}

		this.restoreSplits();

		Array.from(document.querySelectorAll(".workspace-split")).forEach(
			(node) => {
				const theNode = node as HTMLElement;
				theNode.style.display = "flex";
			},
		);

		if (this.plugin.settings.doesWritingFocusShowVignette)
			this.removeVignette(view);
		if (this.plugin.settings.isWritingFocusFullscreen) this.exitFullscreen();

		this.focusModeActive = false;
	}

	private toggleFocusMode() {
		const leaf = this.plugin.app.workspace.activeLeaf;
		const view = leaf.view as ItemView;
		if (view.getViewType() === "empty") return;

		if (this.focusModeActive) {
			this.disableFocusMode(view);
		} else {
			this.enableFocusMode(view);
		}
	}

	async onload() {
		this.plugin.addRibbonIcon(
			"enter",
			"Toggle Writing Focus",
			(_event): void => {
				this.toggleFocusMode();
			},
		);
	}
}
