import type TypewriterModeLib from "@/lib";
import type { AbstractCommand } from "../base/abstract-command";
import { MoveTypewriterDown, MoveTypewriterUp } from "./move-typewriter";
import { ToggleDimming } from "./toggle-dimming";
import { ToggleHemingwayMode } from "./toggle-hemingway-mode";
import { TogglePlugin } from "./toggle-plugin";
import { ToggleTypewriter } from "./toggle-typewriter";
import { ToggleTypewriterAndDimming } from "./toggle-typewriter-and-dimming";
import { WritingFocusCommand } from "./writing-focus";

export function getCommands(
  tm: TypewriterModeLib
): Record<string, AbstractCommand> {
  return Object.fromEntries(
    [
      new TogglePlugin(tm),
      new ToggleTypewriter(tm),
      new ToggleDimming(tm),
      new ToggleTypewriterAndDimming(tm),
      new MoveTypewriterUp(tm),
      new MoveTypewriterDown(tm),
      new WritingFocusCommand(tm),
      new ToggleHemingwayMode(tm),
    ].map((cmd) => [cmd.commandKey, cmd])
  );
}
