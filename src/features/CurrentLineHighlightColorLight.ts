import type TypewriterModePlugin from "@/TypewriterModePlugin";
import CurrentLineHighlightColorBase from "@/features/CurrentLineHighlightColorBase";

export default class CurrentLineHighlightColorLight extends CurrentLineHighlightColorBase {
	public constructor(plugin: TypewriterModePlugin) {
		super(plugin, "light");
	}
}
