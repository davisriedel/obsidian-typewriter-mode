import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class Zen extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings = "zenEnabled";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle Zen Mode On/Off";
  protected settingTitle = "Zen Mode";
  protected settingDesc = "Darkens non-active paragraphs in the editor";

  override enable(): void {
    document.body.classList.add("plugin-typewriter-mode-zen");
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove("plugin-typewriter-mode-zen");
    super.disable();
  }
}
