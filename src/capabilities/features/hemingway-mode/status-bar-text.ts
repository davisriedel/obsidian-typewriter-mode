import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";
import type HemingwayMode from "./hemingway-mode";

export default class HemingwayModeStatusBarText extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "hemingwayModeStatusBarText";
  protected settingTitle = "Status bar text";
  protected settingDesc =
    "Text to display in the status bar when Hemingway mode is active.";

  registerSetting(settingGroup: SettingGroup) {
    settingGroup.addSetting((setting) =>
      setting
        .setName(this.settingTitle)
        .setDesc(this.settingDesc)
        .setClass("typewriter-mode-setting")
        .addText((text) =>
          text
            .setValue(this.getSettingValue() as string)
            .onChange((newValue) => {
              this.setSettingValue(newValue);
              this.tm.saveSettings().catch((error) => {
                console.error("Failed to save settings:", error);
              });
              this.updateHemingwayModeStatusBar();
            })
        )
    );
  }

  private updateHemingwayModeStatusBar() {
    const hemingwayMode = this.tm.features.hemingwayMode
      .isHemingwayModeEnabled as HemingwayMode;
    hemingwayMode.updateStatusBarText();
  }
}
