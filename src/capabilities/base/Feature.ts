import type { PluginSettingTab } from "obsidian";
import type { TypewriterModeSettings } from "../settings";
import Loadable from "./Loadable";

export abstract class Feature extends Loadable {
	protected abstract setting: keyof TypewriterModeSettings;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	enable() {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	disable() {}

	abstract registerSetting(settingTab: PluginSettingTab): void;
}
