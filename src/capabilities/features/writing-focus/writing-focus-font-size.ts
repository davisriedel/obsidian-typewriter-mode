import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusFontSize extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "writingFocusFontSize";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Writing focus font size")
      .setDesc(
        "Custom font size in points for writing focus mode (0 = use default font size)"
      )
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 36, 1)
          .setDynamicTooltip()
          .setValue(this.getSettingValue() as number)
          .onChange((newValue) => {
            this.changeFontSize(newValue);
          })
      );
  }

  override load() {
    const fontSize = this.getSettingValue() as number;
    if (fontSize > 0) {
      this.tm.setCSSVariable("--writing-focus-font-size", `${fontSize}pt`);
    } else {
      this.tm.setCSSVariable("--writing-focus-font-size", "inherit");
    }
  }

  private changeFontSize(newValue: number) {
    this.setSettingValue(newValue);
    if (newValue > 0) {
      this.tm.setCSSVariable("--writing-focus-font-size", `${newValue}pt`);
    } else {
      this.tm.setCSSVariable("--writing-focus-font-size", "inherit");
    }
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
