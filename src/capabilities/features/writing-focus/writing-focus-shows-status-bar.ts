import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class WritingFocusShowsHeader extends FeatureToggle {
  readonly settingKey = "writingFocus.doesWritingFocusShowStatusBar" as const;
  protected override toggleClass = "ptm-writing-focus-shows-status-bar";
  protected settingTitle = "Show status bar in writing focus";
  protected settingDesc =
    "If enabled, the status bar will be shown in writing focus";
}
