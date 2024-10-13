import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class DimHighlightListParent extends FeatureToggle {
	protected override hasCommand = false;
	protected setting: keyof TypewriterModeSettings =
		"isDimHighlightListParentEnabled";
	protected override toggleClass = "ptm-dim-highlight-list-parent";
	protected settingTitle = "Highlight list parents";
	protected settingDesc =
		"If this is enabled, the parent items of the active list item are not dimmed";
}
