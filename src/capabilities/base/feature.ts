import type { SettingGroup } from "obsidian";
import {
  getSettingByPath,
  type SettingsPath,
  type SettingValueAtPath,
  setSettingByPath,
} from "../settings";
import Loadable from "./loadable";

export abstract class Feature extends Loadable {
  abstract readonly settingKey: SettingsPath;

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

  getSettingValue(): SettingValueAtPath<this["settingKey"]> {
    return getSettingByPath(
      this.tm.settings,
      this.settingKey
    ) as SettingValueAtPath<this["settingKey"]>;
  }

  setSettingValue(value: SettingValueAtPath<SettingsPath>): void {
    setSettingByPath(this.tm.settings, this.settingKey, value);
  }
}
