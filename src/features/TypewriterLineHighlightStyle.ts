import { Feature } from "@/features/base/Feature";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { PluginSettingTab, Setting } from "obsidian";

export default class TypewriterLineHighlightStyle extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "typewriterLineHighlightStyle";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Typewriter Line Highlight Style")
      .setDesc("The style of the typewriter line highlight")
      .setClass("typewriter-mode-setting")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("box", "Box")
          .addOption("underline", "Underline")
          .setValue(this.plugin.settings.typewriterLineHighlightStyle)
          .onChange((newValue) => {
            this.changeTypewriterLineHighlightStyle(
              newValue as "box" | "underline"
            );
            settingTab.display();
          })
      )
      .setDisabled(
        !this.plugin.settings.isTypewriterScrollEnabled ||
          !this.plugin.settings.isHighlightTypewriterLineEnabled
      );
  }

  private changeTypewriterLineHighlightStyle(newValue: "box" | "underline") {
    this.plugin.settings.typewriterLineHighlightStyle = newValue;
    this.plugin.reloadCodeMirror();
    this.plugin.saveSettings().then();
  }
}
