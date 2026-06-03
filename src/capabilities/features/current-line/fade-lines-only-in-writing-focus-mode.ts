import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class FadeLinesOnlyInWritingFocusMode extends FeatureToggle {
  readonly settingKey =
    "currentLine.isFadeLinesOnlyInWritingFocusModeEnabled" as const;
  protected override toggleClass = "ptm-fade-lines-only-in-writing-focus-mode";
  protected hasCommand = false;
  protected settingTitle = "Fade lines only in writing focus mode";
  protected settingDesc =
    "Only show the fade lines effect when writing focus mode is active";
}
