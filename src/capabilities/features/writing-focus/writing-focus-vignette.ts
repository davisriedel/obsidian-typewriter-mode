import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class WritingFocusVignette extends FeatureToggle {
  readonly settingKey = "writingFocus.doesWritingFocusShowVignette" as const;
  protected settingTitle = "Writing focus vignette";
  protected settingDesc =
    "Add a vignette to the edges of the screen in writing focus";
}
