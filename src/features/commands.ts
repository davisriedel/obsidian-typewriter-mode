import TypewriterModePlugin from "@/TypewriterModePlugin";

import { FullscreenWritingFocus } from "@/features/FullscreenWritingFocus";
import { MoveTypewriter } from "@/features/MoveTypewriter";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";
import { ToggleDimming } from "./ToggleDimming";
import { ToggleTypewriter } from "./ToggleTypewriter";

export function getCommands(plugin: TypewriterModePlugin) {
	return {
		ToggleTypewriter: new ToggleTypewriter(plugin),
		ToggleDimming: new ToggleDimming(plugin),
		ToggleTypewriterAndDimming: new ToggleTypewriterAndDimming(plugin),
		MoveTypewriter: new MoveTypewriter(plugin),
		FullscreenWritingFocus: new FullscreenWritingFocus(plugin),
	};
}
