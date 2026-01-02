import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class DimTableAsOne extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings = "isDimTableAsOneEnabled";
  protected override toggleClass = "ptm-dim-table-as-one";
  protected settingTitle = "Undim all table cells when editing";
  protected settingDesc =
    "If this is enabled, all table cells are shown/not dimmed when you edit a table. If this is disabled, only the current table cell that you are editing is shown, while the other cells remain dimmed.";
}
