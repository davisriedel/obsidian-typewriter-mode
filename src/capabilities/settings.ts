export interface TypewriterModeSettings {
	version: string | null;
	isAnnounceUpdatesEnabled: boolean;

	isPluginActivated: boolean;

	isTypewriterScrollEnabled: boolean;
	isOnlyActivateAfterFirstInteractionEnabled: boolean;
	isOnlyMaintainTypewriterOffsetWhenReachedEnabled: boolean;
	isTypewriterOnlyUseCommandsEnabled: boolean;
	typewriterOffset: number;
	isKeepLinesAboveAndBelowEnabled: boolean;
	linesAboveAndBelow: number;
	isMaxCharsPerLineEnabled: boolean;
	maxCharsPerLine: number;
	isDimUnfocusedEnabled: boolean;
	isDimHighlightListParentEnabled: boolean;
	isDimTableAsOneEnabled: boolean;
	dimUnfocusedMode: "paragraphs" | "sentences";
	dimUnfocusedEditorsBehavior: "dim-none" | "dim" | "dim-all";
	dimmedOpacity: number;
	isPauseDimUnfocusedWhileScrollingEnabled: boolean;
	isPauseDimUnfocusedWhileSelectingEnabled: boolean;
	isHighlightCurrentLineEnabled: boolean;
	isFadeLinesEnabled: boolean;
	fadeLinesIntensity: number;
	isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
	currentLineHighlightStyle: "box" | "underline";
	currentLineHighlightUnderlineThickness: number;
	"currentLineHighlightColor-dark": string;
	"currentLineHighlightColor-light": string;
	doesWritingFocusShowHeader: boolean;
	doesWritingFocusShowVignette: boolean;
	doesWritingFocusShowStatusBar: boolean;
	isWritingFocusFullscreen: boolean;
	writingFocusVignetteStyle: "box" | "column";
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
	version: null,
	isAnnounceUpdatesEnabled: true,

	isPluginActivated: true,

	isTypewriterScrollEnabled: true,
	isOnlyActivateAfterFirstInteractionEnabled: false,
	isOnlyMaintainTypewriterOffsetWhenReachedEnabled: false,
	isTypewriterOnlyUseCommandsEnabled: false,
	typewriterOffset: 0.5,
	isKeepLinesAboveAndBelowEnabled: false,
	linesAboveAndBelow: 5,
	isMaxCharsPerLineEnabled: false,
	maxCharsPerLine: 64,
	isDimUnfocusedEnabled: false,
	isDimHighlightListParentEnabled: false,
	isDimTableAsOneEnabled: true,
	dimUnfocusedMode: "paragraphs",
	dimUnfocusedEditorsBehavior: "dim",
	dimmedOpacity: 0.25,
	isPauseDimUnfocusedWhileScrollingEnabled: true,
	isPauseDimUnfocusedWhileSelectingEnabled: true,
	isHighlightCurrentLineEnabled: true,
	isFadeLinesEnabled: true,
	fadeLinesIntensity: 0.5,
	isHighlightCurrentLineOnlyInFocusedEditorEnabled: false,
	currentLineHighlightStyle: "box",
	currentLineHighlightUnderlineThickness: 1,
	"currentLineHighlightColor-dark": "#444",
	"currentLineHighlightColor-light": "#ddd",
	doesWritingFocusShowHeader: false,
	doesWritingFocusShowStatusBar: false,
	doesWritingFocusShowVignette: true,
	isWritingFocusFullscreen: true,
	writingFocusVignetteStyle: "box",
};
