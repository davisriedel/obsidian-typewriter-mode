import Loadable from "@/features/base/Loadable";
import type { Editor, MarkdownView } from "obsidian";

export abstract class EditorCommand extends Loadable {
	protected abstract commandKey: string;
	protected abstract commandTitle: string;

	private registerCommand() {
		this.plugin.addCommand({
			id: this.commandKey,
			name: this.commandTitle,
			editorCallback: this.onCommand.bind(this),
		});
	}

	override load() {
		this.registerCommand();
	}

	protected abstract onCommand(editor: Editor, view: MarkdownView): void;
}
