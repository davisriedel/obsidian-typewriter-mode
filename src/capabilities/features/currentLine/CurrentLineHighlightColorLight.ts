import type TypewriterModeLib from "@/lib";
import CurrentLineHighlightColorBase from "./CurrentLineHighlightColorBase";

export default class CurrentLineHighlightColorLight extends CurrentLineHighlightColorBase {
	public constructor(tm: TypewriterModeLib) {
		super(tm, "light");
	}
}
