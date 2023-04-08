export interface TypewriterModeSettings {
  enabled: boolean;
  typewriterOffset: number;
  maxCharsPerLineEnabled: boolean;
  maxCharsPerLine: number;
  zenEnabled: boolean;
  zenOnlyInActiveEditorEnabled: boolean;
  zenOpacity: number;
  pauseZenWhileScrollingEnabled: boolean;
  pauseZenWhileSelectingEnabled: boolean;
  highlightTypewriterLineEnabled: boolean;
  highlightTypewriterLineOnlyInActiveEditorEnabled: boolean;
  typewriterLineHighlightColor: string;
  typewriterLineHighlightStyle: "box" | "underline";
  typewriterLineHighlightUnderlineThickness: number;
  [key: string]: unknown;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  enabled: true,
  typewriterOffset: 0.5,
  maxCharsPerLineEnabled: false,
  maxCharsPerLine: 64,
  zenEnabled: false,
  zenOnlyInActiveEditorEnabled: false,
  zenOpacity: 0.25,
  pauseZenWhileScrollingEnabled: true,
  pauseZenWhileSelectingEnabled: true,
  highlightTypewriterLineEnabled: true,
  highlightTypewriterLineOnlyInActiveEditorEnabled: false,
  typewriterLineHighlightColor: "#333",
  typewriterLineHighlightStyle: "box",
  typewriterLineHighlightUnderlineThickness: 1,
};
