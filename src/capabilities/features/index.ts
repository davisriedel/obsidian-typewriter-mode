import type TypewriterModePlugin from "@/TypewriterModePlugin";
import type { Feature } from "../base/Feature";
import { loadCapabilityGroups } from "../base/loadCapabilityGroups";
import currentLine from "./currentLine";
import dimming from "./dimming";
import general from "./general";
import keepAboveAndBelow from "./keepAboveAndBelow";
import maxChar from "./maxChar";
import typewriter from "./typewriter";
import updates from "./updates";
import writingFocus from "./writingFocus";

export function getFeatures(
	plugin: TypewriterModePlugin,
): Record<string, Record<string, Feature>> {
	return loadCapabilityGroups<Feature>(plugin, {
		currentLine,
		dimming,
		general,
		keepAboveAndBelow,
		maxChar,
		typewriter,
		updates,
		writingFocus,
	});
}
