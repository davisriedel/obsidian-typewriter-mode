import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class FullscreenWritingFocusShowsHeader extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "doesFullscreenWritingFocusShowHeader";
  protected override toggleClass = "ptm-fullscreen-writing-focus-show-header";
  protected requiresReload = false;
  protected hasCommand = false;
  protected settingTitle = "Show Header in Fullscreen Writing Focus";
  protected settingDesc =
    "If enabled, the header will be shown in fullscreen writing focus";
}
