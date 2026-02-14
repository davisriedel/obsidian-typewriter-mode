import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class HighlightCurrentLineOnlyInFocusedEditor extends FeatureToggle {
  readonly settingKey =
    "currentLine.isHighlightCurrentLineOnlyInFocusedEditorEnabled" as const;
  protected override toggleClass =
    "ptm-highlight-current-line-only-in-active-editor";
  protected hasCommand = false;
  protected settingTitle = "Highlight current line only in focused note";
  protected settingDesc =
    "Only show highlighted line in the note your cursor is on (e.g. if you have multiple notes open in split panes)";
}
