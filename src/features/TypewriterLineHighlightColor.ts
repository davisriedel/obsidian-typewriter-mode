import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class TypewriterLineHighlightColor extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "typewriterLineHighlightColor";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Typewriter Line Highlight Color")
      .setDesc("The color of the typewriter line highlight")
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.typewriterLineHighlightColor)
          .onChange((newValue) => {
            this.changeTypewriterLineHighlightColor(newValue);
          })
      )
      .setDisabled(!this.plugin.settings.isHighlightTypewriterLineEnabled);
  }

  override load() {
    this.plugin.setCSSVariable(
      "--typewriter-line-color",
      `${this.plugin.settings.typewriterLineHighlightColor}`
    );
  }

  private changeTypewriterLineHighlightColor(newValue: string) {
    this.plugin.settings.typewriterLineHighlightColor = newValue;
    this.plugin.setCSSVariable("--typewriter-line-color", `${newValue}`);
    this.plugin.saveSettings().then();
  }
}
