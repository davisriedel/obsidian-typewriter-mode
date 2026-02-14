import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class PauseDimUnfocusedWhileSelecting extends FeatureToggle {
  readonly settingKey =
    "dimming.isPauseDimUnfocusedWhileSelectingEnabled" as const;
  protected override toggleClass = "ptm-dim-unfocused-pause-while-selecting";
  protected settingTitle = "Pause dimming while selecting text";
  protected settingDesc =
    "If this is enabled, paragraphs / sentences are not dimmed while selecting text";
}
