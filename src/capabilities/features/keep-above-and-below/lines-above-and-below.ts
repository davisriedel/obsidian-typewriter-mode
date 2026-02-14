import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";

export default class LinesAboveAndBelow extends Feature {
  readonly settingKey = "keepLinesAboveAndBelow.linesAboveAndBelow" as const;

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) =>
      setting
        .setName("Amount of lines above and below the current line")
        .setDesc(
          "The amount of lines to always keep above and below the current line"
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
        )
    );
  }

  private changeAmountOfLinesAboveAndBelow(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
