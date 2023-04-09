export interface TypewriterModeSettings {
  isTypewriterScrollEnabled: boolean;
  typewriterOffset: number;
  isMaxCharsPerLineEnabled: boolean;
  maxCharsPerLine: number;
  isDimUnfocusedParagraphsEnabled: boolean;
  isDimUnfocusedParagraphsOnlyInFocusedEditorEnabled: boolean;
  dimmedParagraphsOpacity: number;
  isPauseDimUnfocusedParagraphsWhileScrollingEnabled: boolean;
  isPauseDimUnfocusedParagraphsWhileSelectingEnabled: boolean;
  isHighlightTypewriterLineEnabled: boolean;
  isHighlightTypewriterLineOnlyInFocusedEditorEnabled: boolean;
  typewriterLineHighlightColor: string;
  typewriterLineHighlightStyle: "box" | "underline";
  typewriterLineHighlightUnderlineThickness: number;
  doesFullscreenWritingFocusShowHeader: boolean;
  doesFullscreenWritingFocusShowVignette: boolean;
  [key: string]: unknown;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  isTypewriterScrollEnabled: true,
  typewriterOffset: 0.5,
  isMaxCharsPerLineEnabled: false,
  maxCharsPerLine: 64,
  isDimUnfocusedParagraphsEnabled: false,
  isDimUnfocusedParagraphsOnlyInFocusedEditorEnabled: false,
  dimmedParagraphsOpacity: 0.25,
  isPauseDimUnfocusedParagraphsWhileScrollingEnabled: true,
  isPauseDimUnfocusedParagraphsWhileSelectingEnabled: true,
  isHighlightTypewriterLineEnabled: true,
  isHighlightTypewriterLineOnlyInFocusedEditorEnabled: false,
  typewriterLineHighlightColor: "#333",
  typewriterLineHighlightStyle: "box",
  typewriterLineHighlightUnderlineThickness: 1,
  doesFullscreenWritingFocusShowHeader: false,
  doesFullscreenWritingFocusShowVignette: true,
};
