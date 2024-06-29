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
	isDimUnfocusedParagraphsEnabled: boolean;
	dimUnfocusedEditorsBehavior: "dim-none" | "dim" | "dim-all";
	dimmedParagraphsOpacity: number;
	isPauseDimUnfocusedParagraphsWhileScrollingEnabled: boolean;
	isPauseDimUnfocusedParagraphsWhileSelectingEnabled: boolean;
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
	isDimUnfocusedParagraphsEnabled: false,
	dimUnfocusedEditorsBehavior: "dim",
	dimmedParagraphsOpacity: 0.25,
	isPauseDimUnfocusedParagraphsWhileScrollingEnabled: true,
	isPauseDimUnfocusedParagraphsWhileSelectingEnabled: true,
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
