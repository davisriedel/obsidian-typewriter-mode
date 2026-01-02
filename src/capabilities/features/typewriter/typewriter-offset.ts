import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class TypewriterOffset extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "typewriterOffset";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Typewriter offset")
      .setDesc(
        "Positions the typewriter line at the specified percentage of the screen"
      )
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue((this.getSettingValue() as number) * 100)
          .onChange((newValue) => {
            this.changeTypewriterOffset(newValue / 100);
          })
      );
  }

  private changeTypewriterOffset(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
