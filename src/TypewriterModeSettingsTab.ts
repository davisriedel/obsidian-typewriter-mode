import type { App } from "obsidian";
import { PluginSettingTab } from "obsidian";
import type TypewriterModePlugin from "@/TypewriterModePlugin";

export default class TypewriterModeSettingTab extends PluginSettingTab {
  private plugin: TypewriterModePlugin;

  constructor(app: App, plugin: TypewriterModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();
    this.plugin.features.forEach((feature) => feature.registerSetting(this));
  }
}
