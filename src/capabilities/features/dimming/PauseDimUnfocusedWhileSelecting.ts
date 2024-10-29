import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class PauseDimUnfocusedWhileSelecting extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"isPauseDimUnfocusedWhileSelectingEnabled";
	protected override toggleClass = "ptm-dim-unfocused-pause-while-selecting";
	protected settingTitle = "Pause dimming while selecting text";
	protected settingDesc =
		"If this is enabled, paragraphs / sentences are not dimmed while selecting text";
}
