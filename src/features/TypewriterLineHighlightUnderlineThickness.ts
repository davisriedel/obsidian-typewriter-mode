import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class TypewriterLineHighlightUnderlineThickness extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "typewriterLineHighlightUnderlineThickness";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Typewriter Line Highlight Underline Thickness")
      .setDesc("The thickness of the underline")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(1, 5, 1)
          .setDynamicTooltip()
          .setValue(
            this.plugin.settings.typewriterLineHighlightUnderlineThickness
          )
          .onChange((newValue) => {
            this.changeTypewriterLineHighlightUnderlineThickness(newValue);
          })
      )
      .setDisabled(
        !this.plugin.settings.isHighlightTypewriterLineEnabled ||
          this.plugin.settings.typewriterLineHighlightStyle !== "underline"
      );
  }

  override load() {
    this.plugin.setCSSVariable(
      "--typewriter-line-underline-thickness",
      `${this.plugin.settings.typewriterLineHighlightUnderlineThickness}px`
    );
  }

  private changeTypewriterLineHighlightUnderlineThickness(newValue: number) {
    this.plugin.settings.typewriterLineHighlightUnderlineThickness = newValue;
    this.plugin.setCSSVariable(
      "--typewriter-line-underline-thickness",
      `${newValue}px`
    );
    this.plugin.saveSettings().then();
  }
}
