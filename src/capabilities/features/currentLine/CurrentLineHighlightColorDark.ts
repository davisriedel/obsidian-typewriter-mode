import type TypewriterModePlugin from "@/TypewriterModePlugin";
import CurrentLineHighlightColorBase from "./CurrentLineHighlightColorBase";

export default class CurrentLineHighlightColorDark extends CurrentLineHighlightColorBase {
	public constructor(plugin: TypewriterModePlugin) {
		super(plugin, "dark");
	}
}
