import { Feature } from "@/features/base/Feature";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { PluginSettingTab, Setting } from "obsidian";

export default class DimmedParagraphsOpacity extends Feature {
  protected setting: keyof TypewriterModeSettings = "dimmedParagraphsOpacity";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Dimmed Paragraphs' Opacity")
      .setDesc("The opacity of dimmed paragraphs")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.dimmedParagraphsOpacity * 100)
          .onChange((newValue) => {
            this.changeDimmedParagraphsOpacity(newValue / 100);
          })
      )
      .setDisabled(!this.plugin.settings.isDimUnfocusedParagraphsEnabled);
  }

  override load() {
    this.plugin.setCSSVariable(
      "--dimmed-paragraphs-opacity",
      `${this.plugin.settings.dimmedParagraphsOpacity}`
    );
  }

  private changeDimmedParagraphsOpacity(newValue = 0.25) {
    this.plugin.settings.dimmedParagraphsOpacity = newValue;
    this.plugin.setCSSVariable("--dimmed-paragraphs-opacity", `${newValue}`);
    this.plugin.saveSettings().then();
  }
}
