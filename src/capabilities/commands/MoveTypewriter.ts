import type { Editor } from "obsidian";
import Loadable from "../base/Loadable";

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export class MoveTypewriter extends Loadable {
	override load() {
		for (const direction of ["up", "down"] as const) {
			this.tm.plugin.addCommand({
				id: `move-typewriter-${direction}`,
				name: `Move typewriter ${direction}`,
				hotkeys: [
					{
						modifiers: ["Mod"],
						key: direction === "up" ? "ArrowUp" : "ArrowDown",
					},
				],
				editorCallback: (editor, _view) => this.onCommand(editor, direction),
			});
		}
	}

	protected onCommand(editor: Editor, direction: "up" | "down") {
		editor.exec(`go${capitalize(direction)}` as "goUp" | "goDown");
		window.dispatchEvent(new Event("moveByCommand"));
	}
}
