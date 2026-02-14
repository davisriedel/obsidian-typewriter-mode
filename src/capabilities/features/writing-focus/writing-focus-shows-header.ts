import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class WritingFocusShowsHeader extends FeatureToggle {
  readonly settingKey = "writingFocus.doesWritingFocusShowHeader" as const;
  protected override toggleClass = "ptm-writing-focus-shows-header";
  protected settingTitle = "Show header in writing focus";
  protected settingDesc =
    "If enabled, the header will be shown in writing focus";
}
