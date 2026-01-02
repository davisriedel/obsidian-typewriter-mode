import type TypewriterModeLib from "@/lib";
import { AbstractCommand } from "../base/abstract-command";

function registerMoveTypewriterCommand(
  tm: TypewriterModeLib,
  direction: "up" | "down"
) {
  const editorCommand = direction === "up" ? "goUp" : "goDown";

  tm.plugin.addCommand({
    id: `move-typewriter-${direction}`,
    name: `Move typewriter ${direction}`,
    hotkeys: [
      {
        modifiers: ["Mod"],
        key: direction === "up" ? "ArrowUp" : "ArrowDown",
      },
    ],
    editorCallback: (editor, _view) => {
      editor.exec(editorCommand);
      window.dispatchEvent(new Event("moveByCommand"));
    },
  });
}

export class MoveTypewriterUp extends AbstractCommand {
  readonly commandKey = "move-typewriter-up";
  readonly commandTitle = "Move typewriter up";
  protected override registerCommand(): void {
    registerMoveTypewriterCommand(this.tm, "up");
  }
}

export class MoveTypewriterDown extends AbstractCommand {
  readonly commandKey = "move-typewriter-down";
  readonly commandTitle = "Move typewriter down";
  protected override registerCommand(): void {
    registerMoveTypewriterCommand(this.tm, "down");
  }
}
