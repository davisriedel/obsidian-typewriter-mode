import type TypewriterModePlugin from "@/TypewriterModePlugin";
import type { App } from "obsidian";
import { PluginSettingTab } from "obsidian";

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
	}
}
