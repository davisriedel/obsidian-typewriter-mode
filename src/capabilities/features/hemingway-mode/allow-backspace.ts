import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class AllowBackspaceInHemingwayMode extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isAllowBackspaceInHemingwayModeEnabled";
  protected override toggleClass = null;
  protected settingTitle = "Allow using Backspace key in Hemingway mode";
  protected settingDesc =
    "Allows deleting text with Backspace when Hemingway mode is active. Useful for fixing typos while maintaining forward-only writing flow.";
}
