import { Feature } from "@/features/base/Feature";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class TypewriterOffset extends Feature {
  protected setting: keyof TypewriterModeSettings = "typewriterOffset";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Typewriter Offset")
      .setDesc(
        "Positions the typewriter line at the specified percentage of the screen"
      )
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.typewriterOffset * 100)
          .onChange((newValue) => {
            this.changeTypewriterOffset(newValue / 100);
          })
      )
      .setDisabled(!this.plugin.settings.isTypewriterScrollEnabled);
  }

  private changeTypewriterOffset(newValue: number) {
    this.plugin.settings.typewriterOffset = newValue;
    if (this.plugin.settings.isTypewriterScrollEnabled)
      this.plugin.reloadCodeMirror();
    this.plugin.saveSettings().then();
  }
}
