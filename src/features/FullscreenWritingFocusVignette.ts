import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class FullscreenWritingFocusVignette extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"doesFullscreenWritingFocusShowVignette";
	protected override toggleClass = "ptm-fullscreen-writing-focus-vignette";
	protected hasCommand = false;
	protected settingTitle = "Fullscreen writing focus vignette";
	protected settingDesc =
		"Add a vignette to the edges of the screen in fullscreen writing focus";
}
