import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type TypewriterModeLib from "@/lib";

type ThemeMode = "light" | "dark";
type SettingKey<T extends ThemeMode> = `currentLineHighlightColor-${T}`;

const RGBA_REGEX =
  /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)/;

export default abstract class CurrentLineHighlightColor extends Feature {
  settingKey: SettingKey<ThemeMode>;
  protected themeMode: ThemeMode;

  constructor(tm: TypewriterModeLib, themeMode: ThemeMode) {
    super(tm);
    this.themeMode = themeMode;
    this.settingKey = `currentLineHighlightColor-${themeMode}`;
  }

  registerSetting(settingTab: PluginSettingTab): void {
    const currentValue = this.getSettingValue() as string;
    const { color, opacity } = this.parseColor(currentValue);

    new Setting(settingTab.containerEl)
      .setName(`Current line highlight color in ${this.themeMode} themes`)
      .setDesc(
        `The color and opacity of the current line highlight in ${this.themeMode} themes`
      )
      .setClass("typewriter-mode-setting")
      .addColorPicker((colorPicker) =>
        colorPicker.setValue(color).onChange((newColor) => {
          const currentOpacity = this.parseColor(
            this.getSettingValue() as string
          ).opacity;
          this.changeCurrentLineHighlightColor(newColor, currentOpacity);
        })
      )
      .addSlider((slider) =>
        slider
          .setLimits(0, 1, 0.01)
          .setValue(opacity)
          .setDynamicTooltip()
          .onChange((newOpacity) => {
            const currentColor = this.parseColor(
              this.getSettingValue() as string
            ).color;
            this.changeCurrentLineHighlightColor(currentColor, newOpacity);
          })
      );
  }

  override load() {
    this.tm.setCSSVariable(
      `--current-line-highlight-color-${this.themeMode}`,
      `${this.getSettingValue()}`
    );
  }

  private parseColor(colorString: string): { color: string; opacity: number } {
    // Try to parse rgba format
    const rgbaMatch = colorString.match(RGBA_REGEX);
    if (rgbaMatch) {
      const r = Number.parseInt(rgbaMatch[1], 10);
      const g = Number.parseInt(rgbaMatch[2], 10);
      const b = Number.parseInt(rgbaMatch[3], 10);
      const alpha = rgbaMatch[4] ? Number.parseFloat(rgbaMatch[4]) : 1;

      // biome-ignore lint/suspicious/noBitwiseOperators: Use bitwise operators for color conversion
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      return { color: hex, opacity: alpha };
    }

    // If it's already a hex color, return it with opacity 1
    if (colorString.startsWith("#")) {
      return { color: colorString, opacity: 1 };
    }

    // Default fallback
    return { color: "#000000", opacity: 1 };
  }

  private changeCurrentLineHighlightColor(color: string, opacity: number) {
    // Convert hex to rgb
    const hex = color.replace("#", "");
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    const newValue = `rgba(${r}, ${g}, ${b}, ${opacity})`;
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
