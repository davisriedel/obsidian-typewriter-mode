export interface TypewriterModeSettings {
	version: string;
	isAnnounceUpdatesEnabled: boolean;

	isPluginActivated: boolean;

	isDisableInCanvasEnabled: boolean;
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
	dimUnfocusedMode: "paragraphs" | "sentences";
	dimUnfocusedEditorsBehavior: "dim-none" | "dim" | "dim-all";
	dimmedOpacity: number;
	isPauseDimUnfocusedWhileScrollingEnabled: boolean;
	isPauseDimUnfocusedWhileSelectingEnabled: boolean;
	isHighlightCurrentLineEnabled: boolean;
	isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
	currentLineHighlightStyle: "box" | "underline";
	currentLineHighlightUnderlineThickness: number;
	"currentLineHighlightColor-dark": string;
	"currentLineHighlightColor-light": string;
	doesWritingFocusShowHeader: boolean;
	doesWritingFocusShowVignette: boolean;
	isWritingFocusFullscreen: boolean;
	writingFocusVignetteStyle: "box" | "column";
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
	version: null,
	isAnnounceUpdatesEnabled: true,

	isPluginActivated: true,

	isDisableInCanvasEnabled: false,
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
	dimUnfocusedMode: "paragraphs",
	dimUnfocusedEditorsBehavior: "dim",
	dimmedOpacity: 0.25,
	isPauseDimUnfocusedWhileScrollingEnabled: true,
	isPauseDimUnfocusedWhileSelectingEnabled: true,
	isHighlightCurrentLineEnabled: true,
	isHighlightCurrentLineOnlyInFocusedEditorEnabled: false,
	currentLineHighlightStyle: "box",
	currentLineHighlightUnderlineThickness: 1,
	"currentLineHighlightColor-dark": "#444",
	"currentLineHighlightColor-light": "#ddd",
	doesWritingFocusShowHeader: false,
	doesWritingFocusShowVignette: true,
	isWritingFocusFullscreen: true,
	writingFocusVignetteStyle: "box",
};
