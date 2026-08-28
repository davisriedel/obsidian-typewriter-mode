import { t } from "@/i18n";
import { Command } from "./command";
import type { FeatureToggle } from "./feature-toggle";

export abstract class ToggleCommand extends Command {
  protected abstract featureToggle: FeatureToggle | null;

  protected override registerCommand(): void {
    this.tm.plugin.addCommand({
      callback: this.onCommand.bind(this),
      id: `${this.commandKey}-toggle`,
      name: t("Toggle {{command}}", { command: t(this.commandTitle) }),
    });
    this.tm.plugin.addCommand({
      callback: this.onEnable.bind(this),
      id: `${this.commandKey}-enable`,
      name: t("Enable {{command}}", { command: t(this.commandTitle) }),
    });
    this.tm.plugin.addCommand({
      callback: this.onDisable.bind(this),
      id: `${this.commandKey}-disable`,
      name: t("Disable {{command}}", { command: t(this.commandTitle) }),
    });
  }

  protected override onCommand() {
    this.featureToggle?.toggle();
  }

  protected onEnable() {
    this.featureToggle?.toggle(true);
  }

  protected onDisable() {
    this.featureToggle?.toggle(false);
  }
}
