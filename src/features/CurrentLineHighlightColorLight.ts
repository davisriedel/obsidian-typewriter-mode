import CurrentLineHighlightColorBase from "@/features/CurrentLineHighlightColorBase";
import type TypewriterModePlugin from "@/TypewriterModePlugin";

export default class CurrentLineHighlightColorLight extends CurrentLineHighlightColorBase {
  public constructor(plugin: TypewriterModePlugin) {
    super(plugin, "light");
  }
}
