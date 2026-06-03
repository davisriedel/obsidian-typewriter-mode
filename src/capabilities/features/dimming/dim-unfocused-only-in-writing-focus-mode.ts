import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class DimUnfocusedOnlyInWritingFocusMode extends FeatureToggle {
  readonly settingKey =
    "dimming.isDimUnfocusedOnlyInWritingFocusModeEnabled" as const;
  protected override toggleClass =
    "ptm-dim-unfocused-only-in-writing-focus-mode";
  protected hasCommand = false;
  protected settingTitle = "Dim unfocused only in writing focus mode";
  protected settingDesc =
    "Only dim unfocused paragraphs / sentences when writing focus mode is active";
}
