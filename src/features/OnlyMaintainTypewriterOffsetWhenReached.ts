import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class OnlyMaintainTypewriterOffsetWhenReached extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isOnlyMaintainTypewriterOffsetWhenReachedEnabled";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle = "Only Maintain Typewriter Offset When Reached";
  protected settingDesc =
    "The line that the cursor is on will not be scrolled to the center of the editor until it the specified typewriter offset is reached. This removes the additional space at the top of the editor.";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isTypewriterScrollEnabled;
  }
}
