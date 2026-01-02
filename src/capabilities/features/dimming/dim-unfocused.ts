import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class DimUnfocused extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isDimUnfocusedEnabled";
  protected override toggleClass = "ptm-dim-unfocused";
  protected settingTitle = "Dim unfocused";
  protected settingDesc = "Dim unfocused paragraphs / sentences";
}
