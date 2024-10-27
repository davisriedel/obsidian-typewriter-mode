// ADAPTED FROM https://github.com/ryanpcmcquen/obsidian-focus-mode

import { Command } from "@/capabilities/base/Command";
import { ItemView } from "obsidian";
import { Platform } from "obsidian";

export class WritingFocus extends Command {
	protected commandKey = "writing-focus";
	protected commandTitle = "Toggle writing focus";

	private focusModeActive = false;

	private readonly maximizedClass = "ptm-maximized";
	private readonly focusModeClass = "ptm-focus-mode";

	private readonly vignetteElClass = "ptm-writing-focus-vignette-element";
	private readonly vignetteStyleAttr = "data-ptm-writing-focus-vignette-style";

	private leftSplitCollapsed = false;
	private rightSplitCollapsed = false;

	private prevWasFullscreen = false;

	protected onCommand(): void {
		this.toggleFocusMode();
	}

	private addVignette(view: ItemView) {
		const vignetteEl = this.tm.settings.doesWritingFocusShowHeader
			? view.containerEl
			: view.contentEl;

		vignetteEl.classList.add(this.vignetteElClass);
		vignetteEl.setAttr(
			this.vignetteStyleAttr,
			this.tm.settings.writingFocusVignetteStyle,
		);
	}

	private removeVignette(view: ItemView) {
		const vignetteEl = this.tm.settings.doesWritingFocusShowHeader
			? view.containerEl
			: view.contentEl;

		vignetteEl.removeAttribute(this.vignetteStyleAttr);
		vignetteEl.classList.remove(this.vignetteElClass);
	}

	private startFullscreen(view: ItemView) {
		// Native electron fullscreen is not supported on mobile
		if (Platform.isMobile) return;

		const currentWindow = window.electron.remote.getCurrentWindow();
		this.prevWasFullscreen = currentWindow.isFullScreen();
		currentWindow.setFullScreen(true);

		const onLeaveFullScreen = () => {
			this.onExitFullscreenWritingFocus(view);
			currentWindow.off("leave-full-screen", onLeaveFullScreen);
		};

		currentWindow.on("leave-full-screen", onLeaveFullScreen);
	}

	private exitFullscreen() {
		// Native electron fullscreen is not supported on mobile
		if (Platform.isMobile) return;

		// Do not exit fullscreen if writing focus was started in fullscreen
		if (this.prevWasFullscreen) return;

		const currentWindow = window.electron.remote.getCurrentWindow();
		currentWindow.setFullScreen(false);
	}

	private onExitFullscreenWritingFocus(view: ItemView) {
		if (this.focusModeActive) this.disableFocusMode(view);
	}

	storeSplitsValues() {
		this.leftSplitCollapsed = this.tm.plugin.app.workspace.leftSplit.collapsed;
		this.rightSplitCollapsed =
			this.tm.plugin.app.workspace.rightSplit.collapsed;
	}

	collapseSplits() {
		this.tm.plugin.app.workspace.leftSplit.collapse();
		this.tm.plugin.app.workspace.rightSplit.collapse();
	}

	restoreSplits() {
		if (!this.leftSplitCollapsed)
			this.tm.plugin.app.workspace.leftSplit.expand();
		if (!this.rightSplitCollapsed)
			this.tm.plugin.app.workspace.rightSplit.expand();
	}

	removeExtraneousClasses() {
		if (
			this.tm.plugin.app.workspace.containerEl.hasClass(this.maximizedClass)
		) {
			this.tm.plugin.app.workspace.containerEl.removeClass(this.maximizedClass);
		}
		if (document.body.classList.contains(this.focusModeClass)) {
			document.body.classList.remove(this.focusModeClass);
		}
	}

	enableFocusMode(view: ItemView) {
		this.focusModeActive = true;

		if (!document.body.classList.contains(this.focusModeClass)) {
			this.storeSplitsValues();
		}

		this.collapseSplits();

		this.tm.plugin.app.workspace.containerEl.toggleClass(
			this.maximizedClass,
			!this.tm.plugin.app.workspace.containerEl.hasClass(this.maximizedClass),
		);

		document.body.classList.toggle(
			this.focusModeClass,
			!document.body.classList.contains(this.focusModeClass),
		);

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

		if (this.tm.settings.doesWritingFocusShowVignette) this.addVignette(view);

		if (this.tm.settings.isWritingFocusFullscreen) this.startFullscreen(view);
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

		if (this.tm.settings.doesWritingFocusShowVignette)
			this.removeVignette(view);
		if (this.tm.settings.isWritingFocusFullscreen) this.exitFullscreen();

		this.focusModeActive = false;
	}

	private toggleFocusMode() {
		const view = this.tm.plugin.app.workspace.getActiveViewOfType(ItemView);
		if (!view || view?.getViewType() === "empty") return;

		if (this.focusModeActive) {
			this.disableFocusMode(view);
		} else {
			this.enableFocusMode(view);
		}
	}

	async onload() {
		this.tm.plugin.addRibbonIcon(
			"enter",
			"Toggle Writing Focus",
			(_event): void => {
				this.toggleFocusMode();
			},
		);
	}
}
