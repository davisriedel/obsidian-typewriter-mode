import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { FeatureToggle } from "@/features/base/FeatureToggle";

export default class DisableInCanvas extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isDisableInCanvasEnabled";
	protected override toggleClass = "ptm-is-disabled-in-canvas";
	protected hasCommand = false;
	protected settingTitle = "Disable the plugin in canvas";
	protected settingDesc = "This will disable the plugin completely in canvas";
}
