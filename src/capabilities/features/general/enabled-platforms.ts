import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  ENABLED_PLATFORMS,
  type EnabledPlatforms as EnabledPlatformsType,
} from "@/capabilities/constants";

export default class EnabledPlatforms extends Feature {
  readonly settingKey = "general.enabledPlatforms" as const;
  protected settingTitle = "Enable on platforms";
  protected settingDesc =
    "Select on which platforms Typewriter Mode should be active";

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) =>
      setting
        .setName(this.settingTitle)
        .setDesc(this.settingDesc)
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(ENABLED_PLATFORMS.BOTH, "Desktop and mobile")
            .addOption(ENABLED_PLATFORMS.DESKTOP, "Desktop only")
            .addOption(ENABLED_PLATFORMS.MOBILE, "Mobile only")
            .setValue(this.getSettingValue() as EnabledPlatformsType)
            .onChange((newValue) => {
              this.setSettingValue(newValue as EnabledPlatformsType);
              this.tm.saveSettings().catch((error) => {
                console.error("Failed to save settings:", error);
              });
            })
        )
    );
  }
}
