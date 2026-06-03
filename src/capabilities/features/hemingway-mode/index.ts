import type TypewriterModeLib from "@/lib";
import AllowBackspaceInHemingwayMode from "./allow-backspace";
import HemingwayMode from "./hemingway-mode";
import HemingwayModeOnlyInWritingFocusMode from "./hemingway-mode-only-in-writing-focus-mode";
import ShowHemingwayModeStatusBar from "./show-status-bar";
import HemingwayModeStatusBarText from "./status-bar-text";

export default function getHemingwayModeFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new HemingwayMode(tm),
      new HemingwayModeOnlyInWritingFocusMode(tm),
      new AllowBackspaceInHemingwayMode(tm),
      new ShowHemingwayModeStatusBar(tm),
      new HemingwayModeStatusBarText(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
