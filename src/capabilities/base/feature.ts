import type { SettingGroup } from "obsidian";
import {
  getSetting,
  type LegacyTypewriterModeSettings,
  setSetting,
} from "../settings";
import Loadable from "./loadable";

export abstract class Feature extends Loadable {
  abstract readonly settingKey: keyof LegacyTypewriterModeSettings;

  enable() {
    // Hook for enabling feature - override in subclass if needed
  }

  disable() {
    // Hook for disabling feature - override in subclass if needed
  }

  abstract registerSetting(settingGroup: SettingGroup): void;

  getBodyClasses(): string[] {
    return [];
  }

  getSettingKey() {
    return this.settingKey;
  }

  getSettingValue() {
    return getSetting(this.tm.settings, this.settingKey);
  }

  setSettingValue(value: string | boolean | number) {
    setSetting(this.tm.settings, this.settingKey, value);
  }
}
