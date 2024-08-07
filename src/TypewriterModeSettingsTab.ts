import type TypewriterModePlugin from "@/TypewriterModePlugin";
import type { App } from "obsidian";
import { Component, MarkdownRenderer, PluginSettingTab } from "obsidian";
import { fetchUpdateNotice } from "./utils/fetchUpdateNotice";

export default class TypewriterModeSettingTab extends PluginSettingTab {
	private plugin: TypewriterModePlugin;

	constructor(app: App, plugin: TypewriterModePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		this.containerEl.empty();

		this.containerEl.createEl("h2", { text: "Typewriter Mode Settings" });

		this.containerEl.createEl("h3", { text: "General" });
		for (const feature of Object.values(this.plugin.features.general)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Typewriter" });
		if (this.plugin.settings.isKeepLinesAboveAndBelowEnabled)
			this.containerEl.createEl("p", {
				text: 'Not available if "keep lines above and below" is activated',
			});
		for (const feature of Object.values(this.plugin.features.typewriter)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Keep Lines Above And Below" });
		if (this.plugin.settings.isTypewriterScrollEnabled)
			this.containerEl.createEl("p", {
				text: "Not available if typewriter scrolling is activated",
			});
		for (const feature of Object.values(
			this.plugin.features.keepAboveAndBelow,
		)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Highlight Current Line" });
		for (const feature of Object.values(this.plugin.features.currentLine)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Dimming" });
		for (const feature of Object.values(this.plugin.features.dimming)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Limit Line Width" });
		for (const feature of Object.values(this.plugin.features.maxChar)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Writing Focus" });
		for (const feature of Object.values(this.plugin.features.writingFocus)) {
			feature.registerSetting(this);
		}

		this.containerEl.createEl("h3", { text: "Updates and Info" });
		for (const feature of Object.values(this.plugin.features.updates)) {
			feature.registerSetting(this);
		}

		fetchUpdateNotice().then((text) => {
			const updateNoticeDiv = this.containerEl.createDiv();
			this.containerEl.appendChild(updateNoticeDiv);
			MarkdownRenderer.renderMarkdown(
				text,
				updateNoticeDiv,
				this.app.vault.getRoot().path,
				new Component(),
			);
		});
	}
}
