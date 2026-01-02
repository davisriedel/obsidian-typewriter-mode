import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class WritingFocusIsFullScreen extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isWritingFocusFullscreen";
  protected settingTitle = "Make Obsidian fullscreen in writing focus";
  protected settingDesc =
    "If enabled, the Obsidian window will toggle to fullscreen when entering writing focus";
}
