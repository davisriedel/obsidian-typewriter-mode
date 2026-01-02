import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class PauseDimUnfocusedWhileSelecting extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isPauseDimUnfocusedWhileSelectingEnabled";
  protected override toggleClass = "ptm-dim-unfocused-pause-while-selecting";
  protected settingTitle = "Pause dimming while selecting text";
  protected settingDesc =
    "If this is enabled, paragraphs / sentences are not dimmed while selecting text";
}
