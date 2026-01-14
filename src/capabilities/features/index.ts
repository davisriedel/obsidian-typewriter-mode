import type TypewriterModeLib from "@/lib";
import type { Feature } from "../base/feature";
import currentLine from "./current-line";
import dimming from "./dimming";
import general from "./general";
import hemingwayMode from "./hemingway-mode";
import keepAboveAndBelow from "./keep-above-and-below";
import maxChar from "./max-char";
import restoreCursorPosition from "./restore-cursor-position";
import typewriter from "./typewriter";
import updates from "./updates";
import writingFocus from "./writing-focus";

export function getFeatures(
  tm: TypewriterModeLib
): Record<string, Record<string, Feature>> {
  return {
    currentLine: currentLine(tm),
    dimming: dimming(tm),
    general: general(tm),
    hemingwayMode: hemingwayMode(tm),
    keepAboveAndBelow: keepAboveAndBelow(tm),
    maxChar: maxChar(tm),
    typewriter: typewriter(tm),
    updates: updates(tm),
    writingFocus: writingFocus(tm),
    restoreCursorPosition: restoreCursorPosition(tm),
  };
}
