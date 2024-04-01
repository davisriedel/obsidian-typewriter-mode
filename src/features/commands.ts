import TypewriterModePlugin from "@/TypewriterModePlugin";

import { FullscreenWritingFocus } from "@/features/FullscreenWritingFocus";
import { MoveTypewriter } from "@/features/MoveTypewriter";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";
import { ToggleDimming } from "./ToggleDimming";
import { ToggleTypewriter } from "./ToggleTypewriter";
import { ActivateTypewriter } from "./ActivateTypewriter";
import { DeactivateTypewriter } from "./DeactivateTypewriter";
import { ActivateFullscreenWritingFocus } from "./ActivateFullscreenWritingFocus";
import { DeactivateFullscreenWritingFocus } from "./DeactivateFullscreenWritingFocus";
import { ActivateDimming } from "./ActivateDimming";
import { DeactivateDimming } from "./DeactivateDimming";
import { ActivateTypewriterAndDimming } from "./ActivateTypewriterAndDimming";
import { DeactivateTypewriterAndDimming } from "./DeactivateTypewriterAndDimming";

export function getCommands(plugin: TypewriterModePlugin) {
	return {
		ToggleTypewriter: new ToggleTypewriter(plugin),
		ActivateTypewriter: new ActivateTypewriter(plugin),
		DeactivateTypewriter: new DeactivateTypewriter(plugin),
		ToggleDimming: new ToggleDimming(plugin),
		ActivateDimming: new ActivateDimming(plugin),
		DeactivateDimming: new DeactivateDimming(plugin),
		ToggleTypewriterAndDimming: new ToggleTypewriterAndDimming(plugin),
		ActivateTypewriterAndDimming: new ActivateTypewriterAndDimming(plugin),
		DeactivateTypewriterAndDimming: new DeactivateTypewriterAndDimming(plugin),
		MoveTypewriter: new MoveTypewriter(plugin),
		FullscreenWritingFocus: new FullscreenWritingFocus(plugin),
		ActivateFullscreenWritingFocus: new ActivateFullscreenWritingFocus(plugin),
		DeactivateFullscreenWritingFocus: new DeactivateFullscreenWritingFocus(plugin),
	};
}
