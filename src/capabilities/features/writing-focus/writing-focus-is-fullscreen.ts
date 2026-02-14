import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class WritingFocusIsFullScreen extends FeatureToggle {
  readonly settingKey = "writingFocus.isWritingFocusFullscreen" as const;
  protected settingTitle = "Make Obsidian fullscreen in writing focus";
  protected settingDesc =
    "If enabled, the Obsidian window will toggle to fullscreen when entering writing focus";
}
