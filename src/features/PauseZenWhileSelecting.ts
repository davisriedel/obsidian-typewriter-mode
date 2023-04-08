import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class PauseZenWhileSelecting extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "pauseZenWhileSelectingEnabled";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle = "Pause Zen Mode While Selecting Text";
  protected settingDesc = "Disables zen mode while selecting text";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.zenEnabled;
  }

  override enable(): void {
    document.body.classList.add(
      "plugin-typewriter-mode-zen-pause-while-selecting"
    );
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove(
      "plugin-typewriter-mode-zen-pause-while-selecting"
    );
    super.disable();
  }
}
