import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class DimHighlightListParent extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isDimHighlightListParentEnabled";
  protected override toggleClass = "ptm-dim-highlight-list-parent";
  protected settingTitle = "Highlight list parents";
  protected settingDesc =
    "If this is enabled, the parent items of the active list item are not dimmed";
}
