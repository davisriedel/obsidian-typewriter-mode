import { Feature } from "@/features/Feature";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { PluginSettingTab, Setting } from "obsidian";

export default class ZenOpacity extends Feature {
  protected setting: keyof TypewriterModeSettings = "zenOpacity";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Zen Opacity")
      .setDesc("The opacity of unfocused paragraphs in zen mode")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.zenOpacity * 100)
          .onChange((newValue) => {
            this.changeZenOpacity(newValue / 100);
          })
      )
      .setDisabled(!this.plugin.settings.zenEnabled);
  }

  override load() {
    this.plugin.setCSSVariable(
      "--zen-opacity",
      `${this.plugin.settings.zenOpacity}`
    );
  }

  private changeZenOpacity(newValue = 0.25) {
    this.plugin.settings.zenOpacity = newValue;
    this.plugin.setCSSVariable("--zen-opacity", `${newValue}`);
    this.plugin.saveSettings().then();
  }
}
