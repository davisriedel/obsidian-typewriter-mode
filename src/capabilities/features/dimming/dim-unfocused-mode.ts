import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  DIM_UNFOCUSED_MODE,
  type DimUnfocusedMode as DimUnfocusedModeType,
} from "@/capabilities/constants";
import { t } from "@/i18n";

export default class DimUnfocusedMode extends Feature {
  readonly settingKey = "dimming.dimUnfocusedMode" as const;

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t("Dim unfocused mode"))
        .setDesc(t("Choose to dim unfocused paragraphs or sentences"))
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(DIM_UNFOCUSED_MODE.PARAGRAPHS, t("Paragraphs"))
            .addOption(DIM_UNFOCUSED_MODE.SENTENCES, t("Sentences"))
            .setValue(this.getSettingValue() as DimUnfocusedModeType)
            .onChange((newValue) => {
              this.change(newValue as DimUnfocusedModeType);
            })
        );
    });
  }

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      desc: t("Choose to dim unfocused paragraphs or sentences"),
      name: t("Dim unfocused mode"),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addDropdown((dropdown) =>
          dropdown
            .addOption(DIM_UNFOCUSED_MODE.PARAGRAPHS, t("Paragraphs"))
            .addOption(DIM_UNFOCUSED_MODE.SENTENCES, t("Sentences"))
            .setValue(this.getSettingValue() as DimUnfocusedModeType)
            .onChange((newValue) => {
              this.change(newValue as DimUnfocusedModeType);
              onChanged?.();
            })
        );
      },
    };
  }

  override load() {
    super.load();
    this.tm.perWindowProps.bodyAttrs["data-ptm-dim-unfocused-mode"] =
      this.getSettingValue() as DimUnfocusedModeType;
  }

  private change(newValue: DimUnfocusedModeType) {
    this.setSettingValue(newValue);
    this.tm.perWindowProps.bodyAttrs["data-ptm-dim-unfocused-mode"] = newValue;
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
