import Loadable from "./Loadable";

export abstract class Command extends Loadable {
	protected abstract commandKey: string;
	protected abstract commandTitle: string;

	private registerCommand() {
		this.plugin.addCommand({
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
