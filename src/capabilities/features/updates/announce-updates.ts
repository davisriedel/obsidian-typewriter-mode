import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class AnnounceUpdates extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isAnnounceUpdatesEnabled";
  protected override toggleClass = "ptm-announce-updates";
  protected settingTitle = "Announce updates";
  protected settingDesc =
    "If enabled you will get a notice with release notes whenever you install a new version of Typewriter Mode";
}
