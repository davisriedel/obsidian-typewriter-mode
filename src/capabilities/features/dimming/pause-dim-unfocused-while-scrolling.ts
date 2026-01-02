import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class PauseDimUnfocusedParagraphsWhileScrolling extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isPauseDimUnfocusedWhileScrollingEnabled";
  protected override toggleClass = "ptm-dim-unfocused-pause-while-scrolling";
  protected settingTitle = "Pause dimming while scrolling";
  protected settingDesc =
    "If this is enabled, paragraphs / sentences are not dimmed while scrolling";
}
