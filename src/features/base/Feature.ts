import { TypewriterModeSettings } from "@/TypewriterModeSettings";
import TypewriterModePlugin from "@/TypewriterModePlugin";
import { PluginSettingTab } from "obsidian";
import Loadable from "@/features/base/Loadable";

export abstract class Feature implements Loadable {
  protected abstract setting: keyof TypewriterModeSettings;

  constructor(protected plugin: TypewriterModePlugin) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  load() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  enable() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disable() {}

  abstract registerSetting(settingTab: PluginSettingTab): void;
}
