import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class FadeLines extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isFadeLinesEnabled";
	protected override toggleClass = "ptm-fade-lines";
	protected hasCommand = false;
	protected settingTitle = "Fade lines";
	protected settingDesc =
		"This places a gradient on the lines above and below the current line, making the text fade out more and more towards the top and bottom of the editor.";
}
