import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class AnnounceUpdates extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isAnnounceUpdatesEnabled";
	protected override toggleClass = "ptm-announce-updates";
	protected hasCommand = false;
	protected settingTitle = "Announce updates";
	protected settingDesc =
		"If enabled you will get a notice with release notes whenever you install a new version of Typewriter Mode";
}
