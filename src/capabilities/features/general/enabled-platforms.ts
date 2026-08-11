import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  ENABLED_PLATFORMS,
  type EnabledPlatforms as EnabledPlatformsType,
} from "@/capabilities/constants";
import { t } from "@/i18n";

export default class EnabledPlatforms extends Feature {
  readonly settingKey = "general.enabledPlatforms" as const;
  protected settingTitle = "Enable on platforms";
  protected settingDesc =
    "Select on which platforms Typewriter Mode should be active";

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: t(this.settingTitle),
      desc: t(this.settingDesc),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addDropdown((dropdown) =>
          dropdown
            .addOption(ENABLED_PLATFORMS.BOTH, t("All platforms"))
            .addOption(ENABLED_PLATFORMS.DESKTOP, t("Desktop only"))
            .addOption(
              ENABLED_PLATFORMS.MOBILE,
              t("Mobile only (tablet and phone)")
            )
            .addOption(ENABLED_PLATFORMS.TABLET, t("Tablet only"))
            .addOption(ENABLED_PLATFORMS.PHONE, t("Phone only"))
            .addOption(
              ENABLED_PLATFORMS.DESKTOP_AND_TABLET,
              t("Desktop and tablet")
            )
            .setValue(this.getSettingValue() as EnabledPlatformsType)
            .onChange((newValue) => {
              this.setSettingValue(newValue as EnabledPlatformsType);
              this.tm.saveSettings().catch((error) => {
                console.error("Failed to save settings:", error);
              });
              onChanged?.();
            })
        );
      },
    };
  }

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t(this.settingTitle))
        .setDesc(t(this.settingDesc))
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(ENABLED_PLATFORMS.BOTH, t("All platforms"))
            .addOption(ENABLED_PLATFORMS.DESKTOP, t("Desktop only"))
            .addOption(
              ENABLED_PLATFORMS.MOBILE,
              t("Mobile only (tablet and phone)")
            )
            .addOption(ENABLED_PLATFORMS.TABLET, t("Tablet only"))
            .addOption(ENABLED_PLATFORMS.PHONE, t("Phone only"))
            .addOption(
              ENABLED_PLATFORMS.DESKTOP_AND_TABLET,
              t("Desktop and tablet")
            )
            .setValue(this.getSettingValue() as EnabledPlatformsType)
            .onChange((newValue) => {
              this.setSettingValue(newValue as EnabledPlatformsType);
              this.tm.saveSettings().catch((error) => {
                console.error("Failed to save settings:", error);
              });
            })
        );
    });
  }
}
