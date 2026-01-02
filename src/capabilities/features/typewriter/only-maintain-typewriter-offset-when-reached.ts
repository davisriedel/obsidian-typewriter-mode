import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class OnlyMaintainTypewriterOffsetWhenReached extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isOnlyMaintainTypewriterOffsetWhenReachedEnabled";
  protected hasCommand = false;
  protected settingTitle = "Only maintain typewriter offset when reached";
  protected settingDesc =
    "The line that the cursor is on will not be scrolled to the center of the editor until it the specified typewriter offset is reached. This removes the additional space at the top of the editor.";
}
