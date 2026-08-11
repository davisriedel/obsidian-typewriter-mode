import { t } from "@/i18n";
import { Command } from "./command";
import type { FeatureToggle } from "./feature-toggle";

export abstract class ToggleCommand extends Command {
  protected abstract featureToggle: FeatureToggle | null;

  protected override registerCommand(): void {
    this.tm.plugin.addCommand({
      id: `${this.commandKey}-toggle`,
      name: t("Toggle {{command}}", { command: t(this.commandTitle) }),
      callback: this.onCommand.bind(this),
    });
    this.tm.plugin.addCommand({
      id: `${this.commandKey}-enable`,
      name: t("Enable {{command}}", { command: t(this.commandTitle) }),
      callback: this.onEnable.bind(this),
    });
    this.tm.plugin.addCommand({
      id: `${this.commandKey}-disable`,
      name: t("Disable {{command}}", { command: t(this.commandTitle) }),
      callback: this.onDisable.bind(this),
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
