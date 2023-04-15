import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class OnlyActivateAfterFirstInteraction extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isOnlyActivateAfterFirstInteractionEnabled";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle = "Only Activate After First Interaction";
  protected settingDesc =
    "Activate the focused line highlight and paragraph dimming only after the first interaction with the editor";
}
