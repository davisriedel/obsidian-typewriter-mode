import type TypewriterModePlugin from "@/TypewriterModePlugin";

import { MoveTypewriter } from "@/features/MoveTypewriter";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";
import { WritingFocus } from "@/features/WritingFocus";
import { ToggleDimming } from "./ToggleDimming";
import { ToggleTypewriter } from "./ToggleTypewriter";
import type { Command } from "./base/Command";

export function getCommands(
	plugin: TypewriterModePlugin,
): Record<string, Command> {
	return [
		new ToggleTypewriter(plugin),
		new ToggleDimming(plugin),
		new ToggleTypewriterAndDimming(plugin),
		new MoveTypewriter(plugin),
		new WritingFocus(plugin),
		// biome-ignore lint: reason
	].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {});
}
