import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class OnlyActivateAfterFirstInteraction extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"isOnlyActivateAfterFirstInteractionEnabled";
	protected settingTitle = "Only activate after first interaction";
	protected settingDesc =
		"Activate the focused line highlight and paragraph dimming only after the first interaction with the editor";
}
