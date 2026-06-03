import type TypewriterModeLib from "@/lib";
import CurrentLineHighlightColorDark from "./current-line-highlight-color-dark";
import CurrentLineHighlightColorLight from "./current-line-highlight-color-light";
import CurrentLineHighlightStyle from "./current-line-highlight-style";
import CurrentLineHighlightUnderlineThickness from "./current-line-highlight-underline-thickness";
import FadeLines from "./fade-lines";
import FadeLinesIntensity from "./fade-lines-intensity";
import FadeLinesOnlyInWritingFocusMode from "./fade-lines-only-in-writing-focus-mode";
import HighlightCurrentLine from "./highlight-current-line";
import HighlightCurrentLineOnlyInFocusedEditor from "./highlight-current-line-only-in-focused-editor";
import HighlightCurrentLineOnlyInWritingFocusMode from "./highlight-current-line-only-in-writing-focus-mode";
import PauseCurrentLineHighlightWhileScrolling from "./pause-current-line-highlight-while-scrolling";
import PauseCurrentLineHighlightWhileSelecting from "./pause-current-line-highlight-while-selecting";

export default function getCurrentLineFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new HighlightCurrentLine(tm),
      new HighlightCurrentLineOnlyInWritingFocusMode(tm),
      new FadeLines(tm),
      new FadeLinesIntensity(tm),
      new FadeLinesOnlyInWritingFocusMode(tm),
      new CurrentLineHighlightColorLight(tm),
      new CurrentLineHighlightColorDark(tm),
      new CurrentLineHighlightStyle(tm),
      new CurrentLineHighlightUnderlineThickness(tm),
      new HighlightCurrentLineOnlyInFocusedEditor(tm),
      new PauseCurrentLineHighlightWhileScrolling(tm),
      new PauseCurrentLineHighlightWhileSelecting(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
