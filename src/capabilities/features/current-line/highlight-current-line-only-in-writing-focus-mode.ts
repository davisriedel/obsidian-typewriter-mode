import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class HighlightCurrentLineOnlyInWritingFocusMode extends FeatureToggle {
  readonly settingKey =
    "currentLine.isHighlightCurrentLineOnlyInWritingFocusModeEnabled" as const;
  protected override toggleClass =
    "ptm-highlight-current-line-only-in-writing-focus-mode";
  protected hasCommand = false;
  protected settingTitle = "Highlight current line only in writing focus mode";
  protected settingDesc =
    "Only show the highlighted line when writing focus mode is active";
}
