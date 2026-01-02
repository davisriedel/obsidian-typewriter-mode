import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusShowsHeader extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "doesWritingFocusShowStatusBar";
  protected override toggleClass = "ptm-writing-focus-shows-status-bar";
  protected settingTitle = "Show status bar in writing focus";
  protected settingDesc =
    "If enabled, the status bar will be shown in writing focus";
}
