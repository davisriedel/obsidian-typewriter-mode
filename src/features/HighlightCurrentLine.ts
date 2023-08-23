import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class HighlightCurrentLine extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isHighlightCurrentLineEnabled";
  protected override toggleClass = "ptm-highlight-current-line";
  protected requiresReload = true;
  protected hasCommand = true;
  protected override commandTitle = "Toggle highlight current line";
  protected settingTitle = "Highlight current line";
  protected settingDesc = "Highlights the line that the cursor is currently on";
}
