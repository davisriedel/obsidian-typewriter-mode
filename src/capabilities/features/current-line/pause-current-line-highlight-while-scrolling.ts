import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class PauseCurrentLineHighlightWhileScrolling extends FeatureToggle {
  readonly settingKey =
    "currentLine.isPauseCurrentLineHighlightWhileScrollingEnabled" as const;
  protected override toggleClass = "ptm-current-line-pause-while-scrolling";
  protected settingTitle = "Pause current line highlight while scrolling";
  protected settingDesc =
    "If enabled, the current line highlight is hidden while scrolling";
}
