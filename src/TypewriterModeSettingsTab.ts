import type TypewriterModePlugin from "@/TypewriterModePlugin";
import type { App } from "obsidian";
import {
	Component,
	MarkdownRenderer,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { fetchUpdateNotice } from "./utils/fetchUpdateNotice";

export default class TypewriterModeSettingTab extends PluginSettingTab {
	private plugin: TypewriterModePlugin;

	constructor(app: App, plugin: TypewriterModePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private addHeading(text: string) {
		return new Setting(this.containerEl).setName(text).setHeading();
	}

	private addText(text: string) {
		return new Setting(this.containerEl).setName(text);
	}

	display(): void {
		this.containerEl.empty();

		for (const feature of Object.values(this.plugin.features.general)) {
			feature.registerSetting(this);
		}

		this.addHeading("Typewriter");
		if (this.plugin.settings.isKeepLinesAboveAndBelowEnabled)
			this.addText(
				'Not available if "keep lines above and below" is activated',
			);
		for (const feature of Object.values(this.plugin.features.typewriter)) {
			feature.registerSetting(this);
		}

		this.addHeading("Keep lines above and below");
		if (this.plugin.settings.isTypewriterScrollEnabled)
			this.addText("Not available if typewriter scrolling is activated");
		for (const feature of Object.values(
			this.plugin.features.keepAboveAndBelow,
		)) {
			feature.registerSetting(this);
		}

		this.addHeading("Highlight current line");
		for (const feature of Object.values(this.plugin.features.currentLine)) {
			feature.registerSetting(this);
		}

		this.addHeading("Dimming");
		for (const feature of Object.values(this.plugin.features.dimming)) {
			feature.registerSetting(this);
		}

		this.addHeading("Limit line width");
		for (const feature of Object.values(this.plugin.features.maxChar)) {
			feature.registerSetting(this);
		}

		this.addHeading("Writing focus");
		for (const feature of Object.values(this.plugin.features.writingFocus)) {
			feature.registerSetting(this);
		}

		this.addHeading("Update notice and funding");
		for (const feature of Object.values(this.plugin.features.updates)) {
			feature.registerSetting(this);
		}

		fetchUpdateNotice().then((text) => {
			const updateNoticeDiv = this.containerEl.createDiv();
			this.containerEl.appendChild(updateNoticeDiv);
			MarkdownRenderer.render(
				this.app,
				text,
				updateNoticeDiv,
				this.app.vault.getRoot().path,
				new Component(),
			);
		});
	}
}
