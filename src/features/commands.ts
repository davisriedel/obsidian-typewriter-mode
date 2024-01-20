import TypewriterModePlugin from "@/TypewriterModePlugin";

import { FullscreenWritingFocus } from "@/features/FullscreenWritingFocus";
import { MoveTypewriter } from "@/features/MoveTypewriter";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";

export function getCommands(plugin: TypewriterModePlugin) {
	return {
		ToggleTypewriterAndDimming: new ToggleTypewriterAndDimming(plugin),
		MoveTypewriter: new MoveTypewriter(plugin),
		FullscreenWritingFocus: new FullscreenWritingFocus(plugin),
	};
}
