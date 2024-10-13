import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusVignette extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"doesWritingFocusShowVignette";
	protected hasCommand = false;
	protected settingTitle = "Writing focus vignette";
	protected settingDesc =
		"Add a vignette to the edges of the screen in writing focus";
}
