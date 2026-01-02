import type TypewriterModeLib from "@/lib";
import WritingFocusIsFullScreen from "./writing-focus-is-fullscreen";
import WritingFocusShowsHeader from "./writing-focus-shows-header";
import WritingFocusShowsStatusBar from "./writing-focus-shows-status-bar";
import WritingFocusVignette from "./writing-focus-vignette";
import WritingFocusVignetteStyle from "./writing-focus-vignette-style";

export default function getWritingFocusFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new WritingFocusShowsHeader(tm),
      new WritingFocusShowsStatusBar(tm),
      new WritingFocusIsFullScreen(tm),
      new WritingFocusVignette(tm),
      new WritingFocusVignetteStyle(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
