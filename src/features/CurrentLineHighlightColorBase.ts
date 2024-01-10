import { Feature } from "@/features/base/Feature";
import type TypewriterModePlugin from "@/TypewriterModePlugin";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

type ThemeMode = "light" | "dark";
type SettingKey<T extends ThemeMode> = `currentLineHighlightColor-${T}`;

export default abstract class CurrentLineHighlightColor extends Feature {
  protected setting: SettingKey<ThemeMode>;
  protected themeMode: ThemeMode;

  public constructor(plugin: TypewriterModePlugin, themeMode: ThemeMode) {
    super(plugin);
    this.themeMode = themeMode;
    this.setting = `currentLineHighlightColor-${themeMode}`;
  }

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName(`Current line highlight color in ${this.themeMode} themes`)
      .setDesc(
        `The color of the current line highlight in ${this.themeMode} themes`,
      )
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue(this.plugin.settings[this.setting] as string)
          .onChange((newValue) => {
            this.changeCurrentLineHighlightColor(newValue);
          }),
      )
      .setDisabled(!this.plugin.settings.isHighlightCurrentLineEnabled);
  }

  override load() {
    this.plugin.setCSSVariable(
      `--current-line-highlight-color-${this.themeMode}`,
      `${this.plugin.settings[this.setting]}`,
    );
  }

  private changeCurrentLineHighlightColor(newValue: string) {
    this.plugin.settings[this.setting] = newValue;
    this.plugin.setCSSVariable(
      `--current-line-highlight-color-${this.themeMode}`,
      `${newValue}`,
    );
    this.plugin.saveSettings().then(() => {
      this.plugin.reloadCodeMirror();
    });
  }
}
