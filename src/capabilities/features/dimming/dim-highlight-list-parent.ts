import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class DimHighlightListParent extends FeatureToggle {
  readonly settingKey = "dimming.isDimHighlightListParentEnabled" as const;
  protected override toggleClass = "ptm-dim-highlight-list-parent";
  protected settingTitle = "Highlight list parents";
  protected settingDesc =
    "If this is enabled, the parent items of the active list item are not dimmed";
}
