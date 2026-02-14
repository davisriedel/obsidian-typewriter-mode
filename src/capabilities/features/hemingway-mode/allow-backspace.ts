import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class AllowBackspaceInHemingwayMode extends FeatureToggle {
  readonly settingKey =
    "hemingwayMode.isAllowBackspaceInHemingwayModeEnabled" as const;
  protected override toggleClass = null;
  protected settingTitle = "Allow using Backspace key in Hemingway mode";
  protected settingDesc =
    "Allows deleting text with Backspace when Hemingway mode is active. Useful for fixing typos while maintaining forward-only writing flow.";
}
