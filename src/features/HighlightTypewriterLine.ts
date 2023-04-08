import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class HighlightTypewriterLine extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "highlightTypewriterLineEnabled";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle Highlight Typewriter Line On/Off";
  protected settingTitle = "Highlight Typewriter Line";
  protected settingDesc =
    "Highlights the line that the typewriter is currently on in the editor";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.enabled;
  }

  override enable(): void {
    document.body.classList.add("plugin-typewriter-mode-highlight-line");
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove("plugin-typewriter-mode-highlight-line");
    super.disable();
  }
}
