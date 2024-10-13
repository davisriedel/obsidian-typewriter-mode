import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusIsFullScreen extends FeatureToggle {
	protected setting: keyof TypewriterModeSettings = "isWritingFocusFullscreen";
	protected hasCommand = false;
	protected settingTitle = "Make Obsidian fullscreen in writing focus";
	protected settingDesc =
		"If enabled, the Obsidian window will toggle to fullscreen when entering writing focus";
}
