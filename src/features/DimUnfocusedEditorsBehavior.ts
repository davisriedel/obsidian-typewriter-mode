import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class DimUnfocusedEditorsBehavior extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "dimUnfocusedEditorsBehavior";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Paragraph Dimming Behavior in Unfocused Notes")
      .setDesc(
        "How to dim paragraphs in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)"
      )
      .setClass("typewriter-mode-setting")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("dim-none", "Do not dim any paragraph")
          .addOption("dim", "Dim all but the last focused paragraph")
          .addOption("dim-all", "Dim all paragraphs")
          .setValue(this.plugin.settings.dimUnfocusedEditorsBehavior)
          .onChange((newValue) => {
            this.changeDimUnfocusedEditorsBehavior(
              newValue as "dim-none" | "dim" | "dim-all"
            );
            settingTab.display();
          })
      )
      .setDisabled(!this.plugin.settings.isDimUnfocusedParagraphsEnabled);
  }

  override load() {
    super.load();
    document.body.setAttr(
      "data-ptm-dim-unfocused-editors-behavior",
      this.plugin.settings.dimUnfocusedEditorsBehavior
    );
  }

  private changeDimUnfocusedEditorsBehavior(
    newValue: "dim-none" | "dim" | "dim-all"
  ) {
    this.plugin.settings.dimUnfocusedEditorsBehavior = newValue;
    document.body.setAttr("data-ptm-dim-unfocused-editors-behavior", newValue);
    this.plugin.saveSettings().then();
  }
}
