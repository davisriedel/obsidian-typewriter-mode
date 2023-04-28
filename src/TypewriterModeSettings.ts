export interface TypewriterModeSettings {
  isTypewriterScrollEnabled: boolean;
  isOnlyActivateAfterFirstInteractionEnabled: boolean;
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: boolean;
  isTypewriterOnlyUseCommandsEnabled: boolean;
  typewriterOffset: number;
  isKeepLinesAboveAndBelowEnabled: boolean;
  linesAboveAndBelow: number;
  isMaxCharsPerLineEnabled: boolean;
  maxCharsPerLine: number;
  isDimUnfocusedParagraphsEnabled: boolean;
  dimUnfocusedEditorsBehavior: "dim-none" | "dim" | "dim-all";
  dimmedParagraphsOpacity: number;
  isPauseDimUnfocusedParagraphsWhileScrollingEnabled: boolean;
  isPauseDimUnfocusedParagraphsWhileSelectingEnabled: boolean;
  isHighlightCurrentLineEnabled: boolean;
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
  currentLineHighlightStyle: "box" | "underline";
  currentLineHighlightUnderlineThickness: number;
  currentLineHighlightColor: string;
  doesFullscreenWritingFocusShowHeader: boolean;
  doesFullscreenWritingFocusShowVignette: boolean;
  fullscreenWritingFocusVignetteStyle: "box" | "column";
  [key: string]: unknown;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  isTypewriterScrollEnabled: true,
  isOnlyActivateAfterFirstInteractionEnabled: false,
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: false,
  isTypewriterOnlyUseCommandsEnabled: false,
  typewriterOffset: 0.5,
  isKeepLinesAboveAndBelowEnabled: false,
  linesAboveAndBelow: 5,
  isMaxCharsPerLineEnabled: false,
  maxCharsPerLine: 64,
  isDimUnfocusedParagraphsEnabled: false,
  dimUnfocusedEditorsBehavior: "dim",
  dimmedParagraphsOpacity: 0.25,
  isPauseDimUnfocusedParagraphsWhileScrollingEnabled: true,
  isPauseDimUnfocusedParagraphsWhileSelectingEnabled: true,
  isHighlightCurrentLineEnabled: true,
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: false,
  currentLineHighlightStyle: "box",
  currentLineHighlightUnderlineThickness: 1,
  currentLineHighlightColor: "#333",
  doesFullscreenWritingFocusShowHeader: false,
  doesFullscreenWritingFocusShowVignette: true,
  fullscreenWritingFocusVignetteStyle: "box",
};
