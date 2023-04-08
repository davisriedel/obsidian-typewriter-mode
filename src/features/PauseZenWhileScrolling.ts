import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class PauseZenWhileScrolling extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "pauseZenWhileScrollingEnabled";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle = "Pause Zen Mode While Scrolling";
  protected settingDesc = "Disables zen mode while scrolling";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.zenEnabled;
  }

  override enable(): void {
    document.body.classList.add(
      "plugin-typewriter-mode-zen-pause-while-scrolling"
    );
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove(
      "plugin-typewriter-mode-zen-pause-while-scrolling"
    );
    super.disable();
  }
}
