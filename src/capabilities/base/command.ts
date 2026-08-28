import { t } from "@/i18n";
import { AbstractCommand } from "./abstract-command";

export abstract class Command extends AbstractCommand {
  protected override registerCommand() {
    this.tm.plugin.addCommand({
      callback: this.onCommand.bind(this),
      id: this.commandKey,
      name: t(this.commandTitle),
    });
  }

  override load() {
    this.registerCommand();
  }

  protected abstract onCommand(): void;
}
