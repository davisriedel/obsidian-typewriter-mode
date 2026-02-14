import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class TogglePluginActivation extends FeatureToggle {
  readonly settingKey = "general.isPluginActivated" as const;
  protected override toggleClass = "ptm-plugin-activated";
  protected settingTitle = "Activate Typewriter Mode";
  protected settingDesc = "This enables or disables all the features below.";
}
