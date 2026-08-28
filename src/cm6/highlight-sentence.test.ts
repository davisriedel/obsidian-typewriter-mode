import { describe, expect, test } from "bun:test";
import { Text } from "@codemirror/state";
import {
  DEFAULT_SENTENCE_BOUNDARY_SETTINGS,
  getActiveSentenceBounds,
} from "./highlight-sentence";

function getBounds(text: string, cursorText: string) {
  const line = Text.of([text]).line(1);
  const pos = text.indexOf(cursorText);
  if (pos === -1) {
    throw new Error(`Cursor text not found: ${cursorText}`);
  }
  return getActiveSentenceBounds(DEFAULT_SENTENCE_BOUNDARY_SETTINGS, line, pos);
}

function getSentence(text: string, cursorText: string) {
  const bounds = getBounds(text, cursorText);
  return text.slice(bounds.start, bounds.end ?? text.length);
}

describe("Chinese sentence boundaries", () => {
  test("recognizes ideographic full stops and full-width question and exclamation marks", () => {
    const text = "第一句。第二句！第三句？";

    expect(getBounds(text, "第一")).toEqual({ end: 4, start: 0 });
    expect(getBounds(text, "第二")).toEqual({ end: 8, start: 4 });
    expect(getBounds(text, "第三")).toEqual({ end: 12, start: 8 });
  });

  test("recognizes a Chinese ellipsis as a sentence boundary", () => {
    const text = "第一句……第二句。";

    expect(getBounds(text, "第一")).toEqual({ end: 5, start: 0 });
    expect(getBounds(text, "第二")).toEqual({ end: 9, start: 5 });
  });

  test("includes consecutive closing punctuation in the preceding sentence", () => {
    const text = "（他说：“你好！”）然后走了。";

    expect(getBounds(text, "你好")).toEqual({ end: 10, start: 0 });
    expect(getBounds(text, "然后")).toEqual({ end: 15, start: 10 });
  });

  test("supports traditional Chinese closing quotation marks", () => {
    const text = "他說：「你好！」然後離開。";

    expect(getBounds(text, "你好")).toEqual({ end: 8, start: 0 });
    expect(getBounds(text, "然後")).toEqual({ end: 13, start: 8 });
  });

  test("handles mixed English and Chinese sentences", () => {
    const text = "Hello. 你好！Next?";

    expect(getBounds(text, "Hello")).toEqual({ end: 6, start: 0 });
    expect(getBounds(text, "你好")).toEqual({ end: 10, start: 7 });
    expect(getBounds(text, "Next")).toEqual({ end: 15, start: 10 });
  });
});

describe("existing English sentence boundaries", () => {
  test("continues to ignore configured abbreviations", () => {
    const text = "Mr. Smith left. Next sentence.";

    expect(getSentence(text, "Smith")).toBe("Mr. Smith left.");
    expect(getSentence(text, "Next")).toBe("Next sentence.");
  });

  test("continues to recognize initialisms", () => {
    const text = "Use e.g. this example. Next sentence.";

    expect(getSentence(text, "this")).toBe("Use e.g. this example.");
    expect(getSentence(text, "Next")).toBe("Next sentence.");
  });
});
