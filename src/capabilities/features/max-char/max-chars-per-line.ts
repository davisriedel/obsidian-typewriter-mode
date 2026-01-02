import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class MaxCharsPerLine extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "maxCharsPerLine";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Maximum number of characters per line")
      .setDesc("The maximum number of characters per line")
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue((this.getSettingValue() as number).toString())
          .onChange((newValue) => {
            this.changeMaxCharsPerLine(Number.parseInt(newValue, 10));
          })
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
