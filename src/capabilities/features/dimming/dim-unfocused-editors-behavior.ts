import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  DIM_UNFOCUSED_EDITORS_BEHAVIOR,
  type DimUnfocusedEditorsBehavior as DimUnfocusedEditorsBehaviorType,
} from "@/capabilities/constants";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class DimUnfocusedEditorsBehavior extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings =
    "dimUnfocusedEditorsBehavior";

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) =>
      setting
        .setName("Dimming behavior in unfocused notes")
        .setDesc(
          "How to dim paragraphs / sentences in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)"
        )
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(
              DIM_UNFOCUSED_EDITORS_BEHAVIOR.NONE,
              "Do not dim anything"
            )
            .addOption(
              DIM_UNFOCUSED_EDITORS_BEHAVIOR.DIM,
              "Dim all but the previously focused paragraph / sentence"
            )
            .addOption(DIM_UNFOCUSED_EDITORS_BEHAVIOR.ALL, "Dim everything")
            .setValue(this.getSettingValue() as DimUnfocusedEditorsBehaviorType)
            .onChange((newValue) => {
              this.changeDimUnfocusedEditorsBehavior(
                newValue as DimUnfocusedEditorsBehaviorType
              );
            })
        )
    );
  }

  override load() {
    super.load();
    this.tm.perWindowProps.bodyAttrs[
      "data-ptm-dim-unfocused-editors-behavior"
    ] = this.getSettingValue() as DimUnfocusedEditorsBehaviorType;
  }

  private changeDimUnfocusedEditorsBehavior(
    newValue: DimUnfocusedEditorsBehaviorType
  ) {
    this.setSettingValue(newValue);
    this.tm.perWindowProps.bodyAttrs[
      "data-ptm-dim-unfocused-editors-behavior"
    ] = newValue;
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
