import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class AnnounceUpdates extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isAnnounceUpdatesEnabled";
	protected override toggleClass = "ptm-dim-unfocused-paragraphs";
	protected hasCommand = false;
	protected settingTitle = "Announce updates";
	protected settingDesc =
		"If enabled you will get a notice with release notes whenever you install a new version of Typewriter Mode";
}
