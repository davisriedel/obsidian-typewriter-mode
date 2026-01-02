import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusVignette extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "doesWritingFocusShowVignette";
  protected settingTitle = "Writing focus vignette";
  protected settingDesc =
    "Add a vignette to the edges of the screen in writing focus";
}
