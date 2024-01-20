import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class FullscreenWritingFocusShowsHeader extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings =
		"doesFullscreenWritingFocusShowHeader";
	protected override toggleClass = "ptm-fullscreen-writing-focus-show-header";
	protected hasCommand = false;
	protected settingTitle = "Show header in fullscreen writing focus";
	protected settingDesc =
		"If enabled, the header will be shown in fullscreen writing focus";
}
