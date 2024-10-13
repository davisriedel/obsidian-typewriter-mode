import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class OnlyActivateAfterFirstInteraction extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isOnlyActivateAfterFirstInteractionEnabled";
	protected hasCommand = false;
	protected settingTitle = "Only activate after first interaction";
	protected settingDesc =
		"Activate the focused line highlight and paragraph dimming only after the first interaction with the editor";
}
