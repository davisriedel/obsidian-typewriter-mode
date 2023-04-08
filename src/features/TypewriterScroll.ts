import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class TypewriterScroll extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings = "enabled";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle Typewriter Scrolling On/Off";
  protected settingTitle = "Typewriter Scrolling";
  protected settingDesc = "Turns typewriter scrolling on or off";

  override enable(): void {
    document.body.classList.add("plugin-typewriter-mode");
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove("plugin-typewriter-mode");
    super.disable();
  }
}
