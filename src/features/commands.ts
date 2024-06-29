import TypewriterModePlugin from "@/TypewriterModePlugin";

import { MoveTypewriter } from "@/features/MoveTypewriter";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";
import { WritingFocus } from "@/features/WritingFocus";
import { ToggleDimming } from "./ToggleDimming";
import { ToggleTypewriter } from "./ToggleTypewriter";

export function getCommands(plugin: TypewriterModePlugin) {
	return {
		ToggleTypewriter: new ToggleTypewriter(plugin),
		ToggleDimming: new ToggleDimming(plugin),
		ToggleTypewriterAndDimming: new ToggleTypewriterAndDimming(plugin),
		MoveTypewriter: new MoveTypewriter(plugin),
		WritingFocus: new WritingFocus(plugin),
	};
}
