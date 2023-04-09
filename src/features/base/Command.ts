import TypewriterModePlugin from "@/TypewriterModePlugin";
import Loadable from "@/features/base/Loadable";

export abstract class Command implements Loadable {
  protected abstract commandKey: string;
  protected abstract commandTitle: string;

  constructor(protected plugin: TypewriterModePlugin) {}

  private registerCommand() {
    this.plugin.addCommand({
      id: this.commandKey,
      name: this.commandTitle,
      callback: this.onCommand.bind(this),
    });
  }

  load() {
    this.registerCommand();
  }

  protected abstract onCommand(): void;
}
