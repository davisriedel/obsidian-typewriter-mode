export interface TypewriterModeSettings {
  enabled: boolean;
  typewriterOffset: number;
  zenEnabled: boolean;
  zenOpacity: number;
  pauseZenWhileScrollingEnabled: boolean;
  highlightTypewriterLineEnabled: boolean;
  typewriterLineHighlightColor: string;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  enabled: true,
  typewriterOffset: 0.5,
  zenEnabled: false,
  zenOpacity: 0.25,
  pauseZenWhileScrollingEnabled: false,
  highlightTypewriterLineEnabled: false,
  typewriterLineHighlightColor: "#333",
};
