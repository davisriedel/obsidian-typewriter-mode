import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class FadeLinesIntensity extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "fadeLinesIntensity";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Intensity of the fade lines gradient")
      .setDesc("How soon lines shall be faded out")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue((this.getSettingValue() as number) * 100)
          .onChange((newValue) => {
            this.changeFadeLinesIntensity(newValue / 100);
          })
      );
  }

  override load() {
    this.tm.setCSSVariable(
      "--ptm-fade-lines-intensity",
      `${(this.getSettingValue() as number) * 100}%`
    );
  }

  private changeFadeLinesIntensity(newValue = 0.5) {
    this.setSettingValue(newValue);
    this.tm.setCSSVariable("--ptm-fade-lines-intensity", `${newValue * 100}%`);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
