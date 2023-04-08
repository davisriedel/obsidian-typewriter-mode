import { FeatureToggle } from "@/features/FeatureToggle";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class ZenOnlyInActiveEditor extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "zenOnlyInActiveEditorEnabled";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Zen Mode Only In Active Editor";
  protected settingDesc = "Disable zen mode in unfocused editors";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.zenEnabled;
  }

  override enable(): void {
    document.body.classList.add(
      "plugin-typewriter-mode-zen-only-in-active-editor"
    );
    super.enable();
  }

  override disable(): void {
    document.body.classList.remove(
      "plugin-typewriter-mode-zen-only-in-active-editor"
    );
    super.disable();
  }
}
