import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class HighlightCurrentLine extends FeatureToggle {
  readonly settingKey = "currentLine.isHighlightCurrentLineEnabled" as const;
  protected override toggleClass = "ptm-highlight-current-line";
  protected settingTitle = "Highlight current line";
  protected settingDesc = "Highlights the line that the cursor is currently on";
}
