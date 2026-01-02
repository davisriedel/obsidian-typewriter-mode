import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class HighlightCurrentLine extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isHighlightCurrentLineEnabled";
  protected override toggleClass = "ptm-highlight-current-line";
  protected settingTitle = "Highlight current line";
  protected settingDesc = "Highlights the line that the cursor is currently on";
}
