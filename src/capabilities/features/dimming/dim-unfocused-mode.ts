import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  DIM_UNFOCUSED_MODE,
  type DimUnfocusedMode as DimUnfocusedModeType,
} from "@/capabilities/constants";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class DimUnfocusedMode extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "dimUnfocusedMode";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
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
            settingTab.display();
          })
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
