import { Feature } from "@/features/base/Feature";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { PluginSettingTab, Setting } from "obsidian";

export default class DimUnfocusedEditorsBehavior extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "dimUnfocusedEditorsBehavior";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Paragraph Dimming Behavior in Unfocused Editors")
      .setDesc("How to dim paragraphs in unfocused editors")
      .setClass("typewriter-mode-setting")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("dim-none", "Do Not Dim Any Paragraph")
          .addOption("dim", "Dim All But Last Focused Paragraph")
          .addOption("dim-all", "Dim All Paragraphs")
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
