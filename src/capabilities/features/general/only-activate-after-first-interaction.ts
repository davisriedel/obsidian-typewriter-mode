import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class OnlyActivateAfterFirstInteraction extends FeatureToggle {
  readonly settingKey =
    "general.isOnlyActivateAfterFirstInteractionEnabled" as const;
  protected settingTitle = "Only activate after first interaction";
  protected settingDesc =
    "Activate the focused line highlight and paragraph dimming only after the first interaction with the editor";
}
