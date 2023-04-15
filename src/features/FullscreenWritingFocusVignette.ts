import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class FullscreenWritingFocusVignette extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "doesFullscreenWritingFocusShowVignette";
  protected override toggleClass = "ptm-fullscreen-writing-focus-vignette";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Fullscreen Writing Focus Vignette";
  protected settingDesc =
    "Add a vignette to the edges of the screen in fullscreen writing focus";
}
