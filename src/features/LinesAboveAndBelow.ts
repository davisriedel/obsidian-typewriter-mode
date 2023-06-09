import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class LinesAboveAndBelow extends Feature {
  protected setting: keyof TypewriterModeSettings = "linesAboveAndBelow";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Amount of Lines Above and Below the Current Line")
      .setDesc(
        "The amount of lines to always keep above and below the current line"
      )
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.linesAboveAndBelow.toString())
          .onChange((newValue) => {
            this.changeAmountOfLinesAboveAndBelow(parseInt(newValue));
          })
      )
      .setDisabled(
        this.plugin.settings.isTypewriterScrollEnabled ||
          !this.plugin.settings.isKeepLinesAboveAndBelowEnabled
      );
  }

  private changeAmountOfLinesAboveAndBelow(newValue: number) {
    this.plugin.settings.linesAboveAndBelow = newValue;
    this.plugin.saveSettings().then();
  }
}
