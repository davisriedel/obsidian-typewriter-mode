import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import { t } from "@/i18n";

export default class DimmedOpacity extends Feature {
  readonly settingKey = "dimming.dimmedOpacity" as const;

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t("Opacity of dimmed elements"))
        .setDesc(t("The opacity of dimmed elements"))
        .setClass("typewriter-mode-setting")
        .addSlider((slider) =>
          slider
            .setLimits(0, 100, 5)
            .setDynamicTooltip()
            .setValue((this.getSettingValue() as number) * 100)
            .onChange((newValue) => {
              this.changeDimmedOpacity(newValue / 100);
            })
        );
    });
  }

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: t("Opacity of dimmed elements"),
      desc: t("The opacity of dimmed elements"),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addSlider((slider) =>
          slider
            .setLimits(0, 100, 5)
            .setDynamicTooltip()
            .setValue((this.getSettingValue() as number) * 100)
            .onChange((newValue) => {
              this.changeDimmedOpacity(newValue / 100);
              onChanged?.();
            })
        );
      },
    };
  }

  override load() {
    this.tm.setCSSVariable("--dimmed-opacity", `${this.getSettingValue()}`);
  }

  private changeDimmedOpacity(newValue = 0.25) {
    this.setSettingValue(newValue);
    this.tm.setCSSVariable("--dimmed-opacity", `${newValue}`);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
