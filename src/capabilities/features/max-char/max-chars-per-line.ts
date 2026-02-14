import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";

export default class MaxCharsPerLine extends Feature {
  readonly settingKey = "maxChars.maxCharsPerLine" as const;

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) =>
      setting
        .setName("Maximum number of characters per line")
        .setDesc("The maximum number of characters per line")
        .setClass("typewriter-mode-setting")
        .addText((text) =>
          text
            .setValue((this.getSettingValue() as number).toString())
            .onChange((newValue) => {
              this.changeMaxCharsPerLine(Number.parseInt(newValue, 10));
            })
        )
    );
  }

  override load() {
    this.tm.setCSSVariable(
      "--max-chars-per-line",
      `${this.getSettingValue()}ch`
    );
  }

  private changeMaxCharsPerLine(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.setCSSVariable("--max-chars-per-line", `${newValue}ch`);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
