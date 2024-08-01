import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class PauseDimUnfocusedWhileSelecting extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isPauseDimUnfocusedWhileSelectingEnabled";
	protected override toggleClass = "ptm-dim-unfocused-pause-while-selecting";
	protected hasCommand = false;
	protected settingTitle = "Pause dimming while selecting text";
	protected settingDesc =
		"If this is enabled, paragraphs / sentences are not dimmed while selecting text";
}
