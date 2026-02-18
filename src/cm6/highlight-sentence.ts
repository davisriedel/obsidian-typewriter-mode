// ADAPTED FROM: https://github.com/artisticat1/focus-active-sentence

import type { Line, Range } from "@codemirror/state";
import { Decoration, type EditorView } from "@codemirror/view";

function textStartsWithIgnored(
  lineText: string,
  ignoredPatterns: string[],
  i: number
) {
  let foundTitle = false;

  for (const title of ignoredPatterns) {
    if (lineText.slice(i + 1 - title.length, i + 1) === title) {
      foundTitle = true;
      break;
    }
  }

  return foundTitle;
}

interface Settings {
  extraCharacters: string;
  ignoredPatterns: string;
  sentenceDelimiters: string;
}

function getActiveSentenceBounds(settings: Settings, line: Line, pos: number) {
  const sentenceDelimiters = settings.sentenceDelimiters.split("");
  const extraCharacters = settings.extraCharacters.split("");
  const ignoredPatterns = settings.ignoredPatterns.split("\n");

  const lineStart = line.from;
  const lineText = line.text;

  let start = -1;

  for (let i = pos - lineStart - 1; i >= 0; i--) {
    if (sentenceDelimiters.contains(lineText[i])) {
      if (textStartsWithIgnored(lineText, ignoredPatterns, i)) {
        continue;
      }

      let offset = 1;

      // Don't highlight spaces between sentences
      while (lineText[i + offset] === " " && offset < pos - lineStart - 1) {
        offset += 1;
      }

      // Account for markdown syntax at the end of sentences (*)
      while (
        extraCharacters.contains(lineText[i + offset]) &&
        sentenceDelimiters.contains(lineText[i + offset - 1]) &&
        offset < pos - lineStart - 1
      ) {
        offset += 1;
      }

      start = i + offset;

      break;
    }
  }
  if (start === -1) {
    start = 0;
  }

  let end = -1;

  for (let i = pos - lineStart; i < line.length; i++) {
    if (sentenceDelimiters.contains(lineText[i])) {
      if (textStartsWithIgnored(lineText, ignoredPatterns, i)) {
        continue;
      }

      let offset = 1;

      // Account for ellipses, "!?", etc.
      while (
        sentenceDelimiters.contains(lineText[i + offset]) &&
        offset < line.length
      ) {
        offset += 1;
      }

      // Account for markdown syntax at the end of sentences (*)
      while (
        extraCharacters.contains(lineText[i + offset]) &&
        offset < line.length
      ) {
        offset += 1;
      }

      end = i + offset;

      break;
    }
  }

  if (end !== -1) {
    return { start: start + lineStart, end: end + lineStart };
  }
  return { start: start + lineStart, end: null };
}

export function getActiveSentenceDecos(view: EditorView, settings: Settings) {
  const widgets: Range<Decoration>[] = [];
  const selection = view.state.selection.main;
  const pos = selection.from;
  const line = view.state.doc.lineAt(pos);

  let activeSentenceBounds = getActiveSentenceBounds(settings, line, pos);

  if (activeSentenceBounds.end == null && pos > line.from) {
    activeSentenceBounds = getActiveSentenceBounds(settings, line, pos - 1);
  }

  const start = activeSentenceBounds.start;
  let end = activeSentenceBounds.end;
  if (end == null) {
    end = line.to;
  }

  function addWidget(from: number, to: number, className: string) {
    widgets.push(
      Decoration.mark({
        inclusive: true,
        attributes: {},
        class: className,
      }).range(from, to)
    );
  }

  if (start !== end) {
    addWidget(start, end, "active-sentence");

    if (line.from !== start) {
      addWidget(line.from, start, "active-paragraph");
    }

    if (end !== line.to) {
      addWidget(end, line.to, "active-paragraph");
    }
  }

  return Decoration.set(widgets, true);
}
