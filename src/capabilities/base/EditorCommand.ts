import type { Editor, MarkdownFileInfo, MarkdownView } from "obsidian";
import Loadable from "./Loadable";

export abstract class EditorCommand extends Loadable {
	protected abstract commandKey: string;
	protected abstract commandTitle: string;

	private registerCommand() {
		this.tm.plugin.addCommand({
			id: this.commandKey,
			name: this.commandTitle,
			editorCallback: this.onCommand.bind(this),
		});
	}

	override load() {
		this.registerCommand();
	}

	protected abstract onCommand(
		editor: Editor,
		view: MarkdownView | MarkdownFileInfo,
	): void;
}
