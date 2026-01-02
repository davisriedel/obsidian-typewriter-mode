import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class LinesAboveAndBelow extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "linesAboveAndBelow";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
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
      );
  }

  private changeAmountOfLinesAboveAndBelow(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
