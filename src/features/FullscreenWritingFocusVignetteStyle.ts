import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class FullscreenWritingFocusVignetteStyle extends Feature {
  protected setting: keyof TypewriterModeSettings =
    "fullscreenWritingFocusVignetteStyle";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Fullscreen Writing Focus Vignette Style")
      .setDesc("The style of the vignette in fullscreen writing focus mode")
      .setClass("typewriter-mode-setting")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("box", "Box")
          .addOption("column", "Column")
          .setValue(this.plugin.settings.fullscreenWritingFocusVignetteStyle)
          .onChange((newValue) => {
            this.changeVignetteStyle(newValue as "box" | "column");
            settingTab.display();
          }),
      )
      .setDisabled(
        !this.plugin.settings.doesFullscreenWritingFocusShowVignette,
      );
  }

  private changeVignetteStyle(newValue: "box" | "column") {
    this.plugin.settings.fullscreenWritingFocusVignetteStyle = newValue;
    this.plugin.saveSettings().then();
  }
}
