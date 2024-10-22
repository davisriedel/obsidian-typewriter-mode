import type TypewriterModeLib from "@/lib";
import type { Command } from "../base/Command";
import { MoveTypewriter } from "./MoveTypewriter";
import { ToggleDimming } from "./ToggleDimming";
import { ToggleTypewriter } from "./ToggleTypewriter";
import { ToggleTypewriterAndDimming } from "./ToggleTypewriterAndDimming";
import { WritingFocus } from "./WritingFocus";

export function getCommands(tm: TypewriterModeLib): Record<string, Command> {
	return [
		ToggleTypewriter,
		ToggleDimming,
		ToggleTypewriterAndDimming,
		MoveTypewriter,
		WritingFocus,
	].reduce((a, v) => {
		// @ts-ignore
		a[v.prototype.constructor.name] = new v(tm);
		return a;
	}, {});
}
