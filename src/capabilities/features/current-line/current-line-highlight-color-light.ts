import type TypewriterModeLib from "@/lib";
import CurrentLineHighlightColorBase from "./current-line-highlight-color-base";

export default class CurrentLineHighlightColorLight extends CurrentLineHighlightColorBase {
  constructor(tm: TypewriterModeLib) {
    super(tm, "light");
  }
}
