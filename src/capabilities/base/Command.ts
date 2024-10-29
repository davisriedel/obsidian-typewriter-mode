import { AbstractCommand } from "./AbstractCommand";

export abstract class Command extends AbstractCommand {
	protected override registerCommand() {
		this.tm.plugin.addCommand({
			id: this.commandKey,
			name: this.commandTitle,
			callback: this.onCommand.bind(this),
		});
	}

	override load() {
		this.registerCommand();
	}

	protected abstract onCommand(): void;
}
