import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class DimmedOpacity extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "dimmedOpacity";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Opacity of dimmed elements")
      .setDesc("The opacity of dimmed elements")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue((this.getSettingValue() as number) * 100)
          .onChange((newValue) => {
            this.changeDimmedOpacity(newValue / 100);
          })
      );
  }

  override load() {
    this.tm.setCSSVariable("--dimmed-opacity", `${this.getSettingValue()}`);
  }

  private changeDimmedOpacity(newValue = 0.25) {
    this.setSettingValue(newValue);
    this.tm.setCSSVariable("--dimmed-opacity", `${newValue}`);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
