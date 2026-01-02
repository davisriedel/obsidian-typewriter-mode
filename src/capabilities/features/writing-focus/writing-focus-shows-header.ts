import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusShowsHeader extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "doesWritingFocusShowHeader";
  protected override toggleClass = "ptm-writing-focus-shows-header";
  protected settingTitle = "Show header in writing focus";
  protected settingDesc =
    "If enabled, the header will be shown in writing focus";
}
