import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type TypewriterModeLib from "@/lib";

type ThemeMode = "light" | "dark";
type SettingKey<T extends ThemeMode> = `currentLineHighlightColor-${T}`;

export default abstract class CurrentLineHighlightColor extends Feature {
  settingKey: SettingKey<ThemeMode>;
  protected themeMode: ThemeMode;

  constructor(tm: TypewriterModeLib, themeMode: ThemeMode) {
    super(tm);
    this.themeMode = themeMode;
    this.settingKey = `currentLineHighlightColor-${themeMode}`;
  }

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName(`Current line highlight color in ${this.themeMode} themes`)
      .setDesc(
        `The color of the current line highlight in ${this.themeMode} themes`
      )
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text.setValue(this.getSettingValue() as string).onChange((newValue) => {
          this.changeCurrentLineHighlightColor(newValue);
        })
      );
  }

  override load() {
    this.tm.setCSSVariable(
      `--current-line-highlight-color-${this.themeMode}`,
      `${this.getSettingValue()}`
    );
  }

  private changeCurrentLineHighlightColor(newValue: string) {
    this.tm.settings.currentLine[this.settingKey] = newValue;
    this.tm.setCSSVariable(
      `--current-line-highlight-color-${this.themeMode}`,
      `${newValue}`
    );
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
