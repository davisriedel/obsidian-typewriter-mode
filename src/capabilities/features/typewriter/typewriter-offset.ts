import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import { t } from "@/i18n";

export default class TypewriterOffset extends Feature {
  readonly settingKey = "typewriter.typewriterOffset" as const;

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      desc: t(
        "Positions the typewriter line at the specified percentage of the screen"
      ),
      name: t("Typewriter offset"),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addSlider((slider) =>
          slider
            .setLimits(0, 100, 5)
            .setDynamicTooltip()
            .setValue((this.getSettingValue() as number) * 100)
            .onChange((newValue) => {
              this.changeTypewriterOffset(newValue / 100);
              onChanged?.();
            })
        );
      },
    };
  }

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t("Typewriter offset"))
        .setDesc(
          t(
            "Positions the typewriter line at the specified percentage of the screen"
          )
        )
        .setClass("typewriter-mode-setting")
        .addSlider((slider) =>
          slider
            .setLimits(0, 100, 5)
            .setDynamicTooltip()
            .setValue((this.getSettingValue() as number) * 100)
            .onChange((newValue) => {
              this.changeTypewriterOffset(newValue / 100);
            })
        );
    });
  }

  private changeTypewriterOffset(newValue: number) {
    this.setSettingValue(newValue);
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
