import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class PauseDimUnfocusedParagraphsWhileScrolling extends FeatureToggle {
  readonly settingKey =
    "dimming.isPauseDimUnfocusedWhileScrollingEnabled" as const;
  protected override toggleClass = "ptm-dim-unfocused-pause-while-scrolling";
  protected settingTitle = "Pause dimming while scrolling";
  protected settingDesc =
    "If this is enabled, paragraphs / sentences are not dimmed while scrolling";
}
