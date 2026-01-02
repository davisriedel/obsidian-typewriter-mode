import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class TogglePluginActivation extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isPluginActivated";
  protected override toggleClass = "ptm-plugin-activated";
  protected settingTitle = "Activate Typewriter Mode";
  protected settingDesc = "This enables or disables all the features below.";
}
