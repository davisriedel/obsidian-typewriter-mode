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

describe("Chinese sentence boundaries", () => {
  test("recognizes ideographic full stops and full-width question and exclamation marks", () => {
    const text = "第一句。第二句！第三句？";

    expect(getBounds(text, "第一")).toEqual({ start: 0, end: 4 });
    expect(getBounds(text, "第二")).toEqual({ start: 4, end: 8 });
    expect(getBounds(text, "第三")).toEqual({ start: 8, end: 12 });
  });

  test("recognizes a Chinese ellipsis as a sentence boundary", () => {
    const text = "第一句……第二句。";

    expect(getBounds(text, "第一")).toEqual({ start: 0, end: 5 });
    expect(getBounds(text, "第二")).toEqual({ start: 5, end: 9 });
  });

  test("includes consecutive closing punctuation in the preceding sentence", () => {
    const text = "（他说：“你好！”）然后走了。";

    expect(getBounds(text, "你好")).toEqual({ start: 0, end: 10 });
    expect(getBounds(text, "然后")).toEqual({ start: 10, end: 15 });
  });

  test("supports traditional Chinese closing quotation marks", () => {
    const text = "他說：「你好！」然後離開。";

    expect(getBounds(text, "你好")).toEqual({ start: 0, end: 8 });
    expect(getBounds(text, "然後")).toEqual({ start: 8, end: 13 });
  });

  test("handles mixed English and Chinese sentences", () => {
    const text = "Hello. 你好！Next?";

    expect(getBounds(text, "Hello")).toEqual({ start: 0, end: 6 });
    expect(getBounds(text, "你好")).toEqual({ start: 7, end: 10 });
    expect(getBounds(text, "Next")).toEqual({ start: 10, end: 15 });
  });
});
