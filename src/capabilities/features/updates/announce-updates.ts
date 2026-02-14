import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class AnnounceUpdates extends FeatureToggle {
  readonly settingKey = "general.isAnnounceUpdatesEnabled" as const;
  protected override toggleClass = "ptm-announce-updates";
  protected settingTitle = "Announce updates";
  protected settingDesc =
    "If enabled you will get a notice with release notes whenever you install a new version of Typewriter Mode";
}
