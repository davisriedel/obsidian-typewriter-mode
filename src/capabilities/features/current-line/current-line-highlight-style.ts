import type { SettingGroup } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import {
  CURRENT_LINE_HIGHLIGHT_STYLE,
  type CurrentLineHighlightStyle as CurrentLineHighlightStyleType,
} from "@/capabilities/constants";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class CurrentLineHighlightStyle extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "currentLineHighlightStyle";

  override getBodyClasses(): string[] {
    return [
      "ptm-current-line-highlight-box",
      "ptm-current-line-highlight-underline",
    ];
  }

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) =>
      setting
        .setName("Current line highlight style")
        .setDesc("The style of the current line highlight")
        .setClass("typewriter-mode-setting")
        .addDropdown((dropdown) =>
          dropdown
            .addOption(CURRENT_LINE_HIGHLIGHT_STYLE.BOX, "Box")
            .addOption(CURRENT_LINE_HIGHLIGHT_STYLE.UNDERLINE, "Underline")
            .setValue(this.getSettingValue() as CurrentLineHighlightStyleType)
            .onChange((newValue) => {
              this.changeCurrentLineHighlightStyle(
                newValue as CurrentLineHighlightStyleType
              );
            })
        )
    );
  }

  override load() {
    super.load();
    this.applyClass();
  }

  private applyClass() {
    const currentLineStyleClass = `ptm-current-line-highlight-${this.getSettingValue()}`;
    console.debug("apply current line style ", currentLineStyleClass);
    for (const cl of this.getBodyClasses()) {
      this.tm.perWindowProps.bodyClasses.remove(cl);
    }
    this.tm.perWindowProps.bodyClasses.push(currentLineStyleClass);
    console.debug(this.tm.perWindowProps.bodyClasses);
  }

  private changeCurrentLineHighlightStyle(
    newValue: CurrentLineHighlightStyleType
  ) {
    console.debug("current line style", newValue);
    this.setSettingValue(newValue);
    this.applyClass();
    this.tm.saveSettings().catch((error) => {
      console.error("Failed to save settings:", error);
    });
  }
}
