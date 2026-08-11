import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  WRITING_FOCUS_VIGNETTE_STYLE,
  type WritingFocusVignetteStyle as WritingFocusVignetteStyleType,
} from "@/capabilities/constants";
import { t } from "@/i18n";

export default class WritingFocusVignetteStyle extends Feature {
  readonly settingKey = "writingFocus.writingFocusVignetteStyle" as const;

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: t("Writing focus vignette style"),
      desc: t("The style of the vignette in writing focus mode"),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addDropdown((dropdown) =>
          dropdown
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.BOX, t("Box"))
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.COLUMN, t("Column"))
            .setValue(this.getSettingValue() as WritingFocusVignetteStyleType)
            .onChange((newValue) => {
              this.changeVignetteStyle(
                newValue as WritingFocusVignetteStyleType
              );
              onChanged?.();
            })
        );
      },
    };
  }

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t("Writing focus vignette style"))
        .setDesc(t("The style of the vignette in writing focus mode"))
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.BOX, t("Box"))
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.COLUMN, t("Column"))
            .setValue(this.getSettingValue() as WritingFocusVignetteStyleType)
            .onChange((newValue) => {
              this.changeVignetteStyle(
                newValue as WritingFocusVignetteStyleType
              );
            })
        );
    });
  }

  private changeVignetteStyle(newValue: WritingFocusVignetteStyleType) {
    this.setSettingValue(newValue);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
