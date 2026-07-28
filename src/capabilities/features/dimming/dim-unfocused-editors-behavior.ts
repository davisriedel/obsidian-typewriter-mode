import type { SettingDefinition, SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  DIM_UNFOCUSED_EDITORS_BEHAVIOR,
  type DimUnfocusedEditorsBehavior as DimUnfocusedEditorsBehaviorType,
} from "@/capabilities/constants";
import { t } from "@/i18n";

export default class DimUnfocusedEditorsBehavior extends Feature {
  readonly settingKey = "dimming.dimUnfocusedEditorsBehavior" as const;

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t("Dimming behavior in unfocused notes"))
        .setDesc(
          t(
            "How to dim paragraphs / sentences in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)"
          )
        )
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(
              DIM_UNFOCUSED_EDITORS_BEHAVIOR.NONE,
              t("Do not dim anything")
            )
            .addOption(
              DIM_UNFOCUSED_EDITORS_BEHAVIOR.DIM,
              t("Dim all but the previously focused paragraph / sentence")
            )
            .addOption(DIM_UNFOCUSED_EDITORS_BEHAVIOR.ALL, t("Dim everything"))
            .setValue(this.getSettingValue() as DimUnfocusedEditorsBehaviorType)
            .onChange((newValue) => {
              this.changeDimUnfocusedEditorsBehavior(
                newValue as DimUnfocusedEditorsBehaviorType
              );
            })
        );
    });
  }

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: t("Dimming behavior in unfocused notes"),
      desc: t(
        "How to dim paragraphs / sentences in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)"
      ),
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addDropdown((dropdown) =>
          dropdown
            .addOption(
              DIM_UNFOCUSED_EDITORS_BEHAVIOR.NONE,
              t("Do not dim anything")
            )
            .addOption(
              DIM_UNFOCUSED_EDITORS_BEHAVIOR.DIM,
              t("Dim all but the previously focused paragraph / sentence")
            )
            .addOption(DIM_UNFOCUSED_EDITORS_BEHAVIOR.ALL, t("Dim everything"))
            .setValue(this.getSettingValue() as DimUnfocusedEditorsBehaviorType)
            .onChange((newValue) => {
              this.changeDimUnfocusedEditorsBehavior(
                newValue as DimUnfocusedEditorsBehaviorType
              );
              onChanged?.();
            })
        );
      },
    };
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
