import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class CurrentLineHighlightUnderlineThickness extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "currentLineHighlightUnderlineThickness";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Current Line Underline Thickness")
      .setDesc(
        "The thickness of the underline that highlights the current line"
      )
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(1, 5, 1)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.currentLineHighlightUnderlineThickness)
          .onChange((newValue) => {
            this.changeCurrentLineHighlightUnderlineThickness(newValue);
          })
      )
      .setDisabled(
        !this.plugin.settings.isHighlightCurrentLineEnabled ||
          this.plugin.settings.currentLineHighlightStyle !== "underline"
      );
  }

  override load() {
    this.plugin.setCSSVariable(
      "--current-line-highlight-underline-thickness",
      `${this.plugin.settings.currentLineHighlightUnderlineThickness}px`
    );
  }

  private changeCurrentLineHighlightUnderlineThickness(newValue: number) {
    this.plugin.settings.currentLineHighlightUnderlineThickness = newValue;
    this.plugin.setCSSVariable(
      "--current-line-highlight-underline-thickness",
      `${newValue}px`
    );
    this.plugin.saveSettings().then();
  }
}
