import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class OnlyActivateAfterFirstInteraction extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"isOnlyActivateAfterFirstInteractionEnabled";
	protected requiresReload = true;
	protected hasCommand = false;
	protected settingTitle = "Only activate after first interaction";
	protected settingDesc =
		"Activate the focused line highlight and paragraph dimming only after the first interaction with the editor";
}
