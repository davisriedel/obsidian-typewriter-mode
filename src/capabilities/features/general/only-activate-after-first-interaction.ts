import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class OnlyActivateAfterFirstInteraction extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isOnlyActivateAfterFirstInteractionEnabled";
  protected settingTitle = "Only activate after first interaction";
  protected settingDesc =
    "Activate the focused line highlight and paragraph dimming only after the first interaction with the editor";
}
