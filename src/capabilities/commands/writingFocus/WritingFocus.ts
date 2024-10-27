// ADAPTED FROM https://github.com/ryanpcmcquen/obsidian-focus-mode

import type TypewriterModeLib from "@/lib";
import { ItemView } from "obsidian";
import { Platform } from "obsidian";

export class WritingFocus {
	private readonly tm: TypewriterModeLib;

	constructor(tm: TypewriterModeLib) {
		this.tm = tm;
	}

	private focusModeActive = false;

	private readonly maximizedClass = "ptm-maximized";
	private readonly focusModeClass = "ptm-focus-mode";

	private readonly vignetteElClass = "ptm-writing-focus-vignette-element";
	private readonly vignetteStyleAttr = "data-ptm-writing-focus-vignette-style";

	private leftSplitCollapsed = false;
	private rightSplitCollapsed = false;

	private prevWasFullscreen = false;

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
		if (this.focusModeActive) this.disableFocusModeForView(view);
	}

<<<<<<< HEAD:src/capabilities/commands/writingFocus/WritingFocus.ts
	private storeSplitsValues() {
		this.leftSplitCollapsed = this.tm.plugin.app.workspace.leftSplit.collapsed;
		this.rightSplitCollapsed =
			this.tm.plugin.app.workspace.rightSplit.collapsed;
||||||| parent of 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	storeSplitsValues() {
		this.leftSplitCollapsed = this.tm.app.workspace.leftSplit.collapsed;
		this.rightSplitCollapsed = this.tm.app.workspace.rightSplit.collapsed;
=======
	storeSplitsValues() {
		this.leftSplitCollapsed = this.tm.plugin.app.workspace.leftSplit.collapsed;
		this.rightSplitCollapsed = this.tm.plugin.app.workspace.rightSplit.collapsed;
>>>>>>> 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	}

<<<<<<< HEAD:src/capabilities/commands/writingFocus/WritingFocus.ts
	private collapseSplits() {
		this.tm.plugin.app.workspace.leftSplit.collapse();
		this.tm.plugin.app.workspace.rightSplit.collapse();
||||||| parent of 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	collapseSplits() {
		this.tm.app.workspace.leftSplit.collapse();
		this.tm.app.workspace.rightSplit.collapse();
=======
	collapseSplits() {
		this.tm.plugin.app.workspace.leftSplit.collapse();
		this.tm.plugin.app.workspace.rightSplit.collapse();
>>>>>>> 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	}

<<<<<<< HEAD:src/capabilities/commands/writingFocus/WritingFocus.ts
	private restoreSplits() {
		if (!this.leftSplitCollapsed)
			this.tm.plugin.app.workspace.leftSplit.expand();
		if (!this.rightSplitCollapsed)
			this.tm.plugin.app.workspace.rightSplit.expand();
||||||| parent of 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	restoreSplits() {
		if (!this.leftSplitCollapsed) this.tm.app.workspace.leftSplit.expand();
		if (!this.rightSplitCollapsed) this.tm.app.workspace.rightSplit.expand();
=======
	restoreSplits() {
		if (!this.leftSplitCollapsed) this.tm.plugin.app.workspace.leftSplit.expand();
		if (!this.rightSplitCollapsed) this.tm.plugin.app.workspace.rightSplit.expand();
>>>>>>> 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	}

<<<<<<< HEAD:src/capabilities/commands/writingFocus/WritingFocus.ts
	private removeExtraneousClasses() {
		if (
			this.tm.plugin.app.workspace.containerEl.hasClass(this.maximizedClass)
		) {
			this.tm.plugin.app.workspace.containerEl.removeClass(this.maximizedClass);
||||||| parent of 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	removeExtraneousClasses() {
		if (this.tm.app.workspace.containerEl.hasClass(this.maximizedClass)) {
			this.tm.app.workspace.containerEl.removeClass(this.maximizedClass);
=======
	removeExtraneousClasses() {
		if (this.tm.plugin.app.workspace.containerEl.hasClass(this.maximizedClass)) {
			this.tm.plugin.app.workspace.containerEl.removeClass(this.maximizedClass);
>>>>>>> 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
		}
		if (document.body.classList.contains(this.focusModeClass)) {
			document.body.classList.remove(this.focusModeClass);
		}
	}

	private enableFocusModeForView(view: ItemView) {
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

	private disableFocusModeForView(view: ItemView) {
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

<<<<<<< HEAD:src/capabilities/commands/writingFocus/WritingFocus.ts
	public enableFocusMode() {
		const view = this.tm.plugin.app.workspace.getActiveViewOfType(ItemView);
||||||| parent of 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
	private toggleFocusMode() {
		const view = this.tm.app.workspace.getActiveViewOfType(ItemView);
=======
	private toggleFocusMode() {
		const view = this.tm.plugin.app.workspace.getActiveViewOfType(ItemView);
>>>>>>> 55c5168 (update lib):src/capabilities/commands/WritingFocus.ts
		if (!view || view?.getViewType() === "empty") return;
		this.enableFocusModeForView(view);
	}

	public disableFocusMode() {
		const view = this.tm.plugin.app.workspace.getActiveViewOfType(ItemView);
		if (!view || view?.getViewType() === "empty") return;
		this.disableFocusModeForView(view);
	}

	public toggleFocusMode() {
		this.focusModeActive ? this.disableFocusMode() : this.enableFocusMode();
	}
}
