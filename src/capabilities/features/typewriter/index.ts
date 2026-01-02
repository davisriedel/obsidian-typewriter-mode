import type TypewriterModeLib from "@/lib";
import OnlyMaintainTypewriterOffsetWhenReached from "./only-maintain-typewriter-offset-when-reached";
import TypewriterOffset from "./typewriter-offset";
import TypewriterOnlyUseCommands from "./typewriter-only-use-commands";
import TypewriterScroll from "./typewriter-scroll";

export default function getTypewriterFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new TypewriterScroll(tm),
      new TypewriterOffset(tm),
      new OnlyMaintainTypewriterOffsetWhenReached(tm),
      new TypewriterOnlyUseCommands(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
