import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import Loadable from "@/features/base/Loadable";
import type { PluginSettingTab } from "obsidian";

export abstract class Feature extends Loadable {
	protected abstract setting: keyof TypewriterModeSettings;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	enable() {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	disable() {}

	protected isSettingEnabled(): boolean {
		return this.plugin.settings.isPluginActivated;
	}

	abstract registerSetting(settingTab: PluginSettingTab): void;
}
