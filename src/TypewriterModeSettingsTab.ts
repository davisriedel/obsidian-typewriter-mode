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
		for (const feature of Object.values(this.plugin.features)) {
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
