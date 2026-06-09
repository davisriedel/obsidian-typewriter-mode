import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  WRITING_FOCUS_VIGNETTE_STYLE,
  type WritingFocusVignetteStyle as WritingFocusVignetteStyleType,
} from "@/capabilities/constants";

export default class WritingFocusVignetteStyle extends Feature {
  readonly settingKey = "writingFocus.writingFocusVignetteStyle" as const;

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: "Writing focus vignette style",
      desc: "The style of the vignette in writing focus mode",
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addDropdown((dropdown) =>
          dropdown
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.BOX, "Box")
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.COLUMN, "Column")
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
        .setName("Writing focus vignette style")
        .setDesc("The style of the vignette in writing focus mode")
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.BOX, "Box")
            .addOption(WRITING_FOCUS_VIGNETTE_STYLE.COLUMN, "Column")
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
