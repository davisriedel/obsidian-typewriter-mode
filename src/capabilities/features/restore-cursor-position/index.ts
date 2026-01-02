import type TypewriterModeLib from "@/lib";
import RestoreCursorPosition from "./restore-cursor-position";

export default function getRestoreCursorPositionFeatures(
  tm: TypewriterModeLib
) {
  return Object.fromEntries(
    [new RestoreCursorPosition(tm)].map((feature) => [
      feature.getSettingKey(),
      feature,
    ])
  );
}
