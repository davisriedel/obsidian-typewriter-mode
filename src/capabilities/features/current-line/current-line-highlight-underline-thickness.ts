import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class CurrentLineHighlightUnderlineThickness extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings =
    "currentLineHighlightUnderlineThickness";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Current line underline thickness")
      .setDesc(
        "The thickness of the underline that highlights the current line"
      )
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(1, 5, 1)
          .setDynamicTooltip()
          .setValue(this.getSettingValue() as number)
          .onChange((newValue) => {
            this.changeCurrentLineHighlightUnderlineThickness(newValue);
          })
      );
  }

  override load() {
    this.tm.setCSSVariable(
      "--current-line-highlight-underline-thickness",
      `${this.getSettingValue()}px`
    );
  }

  private changeCurrentLineHighlightUnderlineThickness(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.setCSSVariable(
      "--current-line-highlight-underline-thickness",
      `${newValue}px`
    );
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
