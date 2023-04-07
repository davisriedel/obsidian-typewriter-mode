export interface TypewriterModeSettings {
  enabled: boolean;
  typewriterOffset: number;
  zenEnabled: boolean;
  zenOpacity: number;
  pauseZenWhileScrollingEnabled: boolean;
  pauseZenWhileSelectingEnabled: boolean;
  highlightTypewriterLineEnabled: boolean;
  typewriterLineHighlightColor: string;
  typewriterLineHighlightStyle: "box" | "underline";
  typewriterLineHighlightUnderlineThickness: number;
  [key: string]: unknown;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  enabled: true,
  typewriterOffset: 0.5,
  zenEnabled: false,
  zenOpacity: 0.25,
  pauseZenWhileScrollingEnabled: true,
  pauseZenWhileSelectingEnabled: true,
  highlightTypewriterLineEnabled: true,
  typewriterLineHighlightColor: "#333",
  typewriterLineHighlightStyle: "box",
  typewriterLineHighlightUnderlineThickness: 1,
};
