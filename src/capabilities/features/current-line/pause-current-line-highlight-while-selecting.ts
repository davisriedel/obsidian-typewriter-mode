import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class PauseCurrentLineHighlightWhileSelecting extends FeatureToggle {
  readonly settingKey =
    "currentLine.isPauseCurrentLineHighlightWhileSelectingEnabled" as const;
  protected override toggleClass = "ptm-current-line-pause-while-selecting";
  protected settingTitle = "Pause current line highlight while selecting text";
  protected settingDesc =
    "If enabled, the current line highlight is hidden while selecting text";
}
