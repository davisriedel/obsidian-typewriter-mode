import type { Editor, MarkdownView } from "obsidian";
import { capitalize } from "@/utils/capitalize";
import Loadable from "@/features/base/Loadable";

export class MoveTypewriter extends Loadable {
  override load() {
    (["up", "down"] as const).forEach((direction) => {
      this.plugin.addCommand({
        id: `move-typewriter-${direction}`,
        name: `Move typewriter ${direction}`,
        hotkeys: [
          {
            modifiers: ["Mod"],
            key: direction === "up" ? "ArrowUp" : "ArrowDown",
          },
        ],
        editorCallback: (editor: Editor, _view: MarkdownView) =>
          this.onCommand(editor, direction),
      });
    });
  }

  protected onCommand(editor: Editor, direction: "up" | "down") {
    editor.exec(`go${capitalize(direction)}` as "goUp" | "goDown");
    window.dispatchEvent(new Event("moveByCommand"));
  }
}
