import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class CurrentLineHighlightColor extends Feature {
  protected setting: keyof TypewriterModeSettings = "currentLineHighlightColor";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Current Line Highlight Color")
      .setDesc("The color of the current line highlight")
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.currentLineHighlightColor)
          .onChange((newValue) => {
            this.changeCurrentLineHighlightColor(newValue);
          }),
      )
      .setDisabled(!this.plugin.settings.isHighlightCurrentLineEnabled);
  }

  override load() {
    this.plugin.setCSSVariable(
      "--current-line-highlight-color",
      `${this.plugin.settings.currentLineHighlightColor}`,
    );
  }

  private changeCurrentLineHighlightColor(newValue: string) {
    this.plugin.settings.currentLineHighlightColor = newValue;
    this.plugin.setCSSVariable("--current-line-highlight-color", `${newValue}`);
    this.plugin.saveSettings().then();
  }
}
