import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class OnlyMaintainTypewriterOffsetWhenReached extends FeatureToggle {
  readonly settingKey =
    "typewriter.isOnlyMaintainTypewriterOffsetWhenReachedEnabled" as const;
  protected hasCommand = false;
  protected settingTitle = "Only maintain typewriter offset when reached";
  protected settingDesc =
    "The line that the cursor is on will not be scrolled to the center of the editor until it the specified typewriter offset is reached. This removes the additional space at the top of the editor.";
}
