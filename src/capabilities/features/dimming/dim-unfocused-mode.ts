import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  DIM_UNFOCUSED_MODE,
  type DimUnfocusedMode as DimUnfocusedModeType,
} from "@/capabilities/constants";

export default class DimUnfocusedMode extends Feature {
  readonly settingKey = "dimming.dimUnfocusedMode" as const;

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) =>
      setting
        .setName("Dim unfocused mode")
        .setDesc("Choose to dim unfocused paragraphs or sentences")
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(DIM_UNFOCUSED_MODE.PARAGRAPHS, "Paragraphs")
            .addOption(DIM_UNFOCUSED_MODE.SENTENCES, "Sentences")
            .setValue(this.getSettingValue() as DimUnfocusedModeType)
            .onChange((newValue) => {
              this.change(newValue as DimUnfocusedModeType);
            })
        )
    );
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
