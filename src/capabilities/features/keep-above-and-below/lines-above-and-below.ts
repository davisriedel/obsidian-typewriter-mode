import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import { t } from "@/i18n";

export default class LinesAboveAndBelow extends Feature {
  readonly settingKey = "keepLinesAboveAndBelow.linesAboveAndBelow" as const;

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: t("Amount of lines above and below the current line"),
      desc: t(
        "The amount of lines to always keep above and below the current line"
      ),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addText((text) =>
          text
            .setValue((this.getSettingValue() as number).toString())
            .onChange((newValue) => {
              this.changeAmountOfLinesAboveAndBelow(
                Number.parseInt(newValue, 10)
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
        .setName(t("Amount of lines above and below the current line"))
        .setDesc(
          t(
            "The amount of lines to always keep above and below the current line"
          )
        )
        .setClass("typewriter-mode-setting")
        .addText((text) =>
          text
            .setValue((this.getSettingValue() as number).toString())
            .onChange((newValue) => {
              this.changeAmountOfLinesAboveAndBelow(
                Number.parseInt(newValue, 10)
              );
            })
        );
    });
  }

  private changeAmountOfLinesAboveAndBelow(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
