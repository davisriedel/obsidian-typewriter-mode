import type TypewriterModeLib from "@/lib";
import CurrentLineHighlightColorBase from "./CurrentLineHighlightColorBase";

export default class CurrentLineHighlightColorDark extends CurrentLineHighlightColorBase {
	public constructor(tm: TypewriterModeLib) {
		super(tm, "dark");
	}
}
