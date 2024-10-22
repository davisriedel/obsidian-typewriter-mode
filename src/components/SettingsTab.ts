import type TypewriterModeLib from "@/lib";
import fundingText from "@/texts/Funding.md" with { type: "text" };
import type { App } from "obsidian";
import {
	Component,
	MarkdownRenderer,
	PluginSettingTab,
	Setting,
} from "obsidian";

export default class TypewriterModeSettingTab extends PluginSettingTab {
	private tm: TypewriterModeLib;

	constructor(app: App, tm: TypewriterModeLib) {
		super(app, tm.plugin);
		this.tm = tm;
	}

	private addHeading(text: string) {
		return new Setting(this.containerEl).setName(text).setHeading();
	}

	private addText(text: string) {
		return new Setting(this.containerEl).setName(text);
	}

	display(): void {
		this.containerEl.empty();

		for (const feature of Object.values(this.tm.features.general)) {
			feature.registerSetting(this);
		}

		this.addHeading("Typewriter");
		if (this.tm.settings.isKeepLinesAboveAndBelowEnabled)
			this.addText(
				'Not available if "keep lines above and below" is activated',
			);
		for (const feature of Object.values(this.tm.features.typewriter)) {
			feature.registerSetting(this);
		}

		this.addHeading("Keep lines above and below");
		if (this.tm.settings.isTypewriterScrollEnabled)
			this.addText("Not available if typewriter scrolling is activated");
		for (const feature of Object.values(this.tm.features.keepAboveAndBelow)) {
			feature.registerSetting(this);
		}

		this.addHeading("Highlight current line");
		for (const feature of Object.values(this.tm.features.currentLine)) {
			feature.registerSetting(this);
		}

		this.addHeading("Dimming");
		for (const feature of Object.values(this.tm.features.dimming)) {
			feature.registerSetting(this);
		}

		this.addHeading("Limit line width");
		for (const feature of Object.values(this.tm.features.maxChar)) {
			feature.registerSetting(this);
		}

		this.addHeading("Writing focus");
		for (const feature of Object.values(this.tm.features.writingFocus)) {
			feature.registerSetting(this);
		}

		this.addHeading("Update notice and funding");
		for (const feature of Object.values(this.tm.features.updates)) {
			feature.registerSetting(this);
		}

		const updateNoticeDiv = this.containerEl.createDiv();
		this.containerEl.appendChild(updateNoticeDiv);
		MarkdownRenderer.render(
			this.app,
			fundingText,
			updateNoticeDiv,
			this.app.vault.getRoot().path,
			new Component(),
		);
	}
}
