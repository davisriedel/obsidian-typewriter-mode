import TypewriterModePlugin from "@/TypewriterModePlugin";

import CurrentLineHighlightColorDark from "@/features/CurrentLineHighlightColorDark";
import CurrentLineHighlightColorLight from "@/features/CurrentLineHighlightColorLight";
import CurrentLineHighlightStyle from "@/features/CurrentLineHighlightStyle";
import CurrentLineHighlightUnderlineThickness from "@/features/CurrentLineHighlightUnderlineThickness";
import DimUnfocusedEditorsBehavior from "@/features/DimUnfocusedEditorsBehavior";
import DimUnfocusedParagraphs from "@/features/DimUnfocusedParagraphs";
import DimmedParagraphsOpacity from "@/features/DimmedParagraphsOpacity";
import FullscreenWritingFocusShowsHeader from "@/features/FullscreenWritingFocusShowsHeader";
import FullscreenWritingFocusVignette from "@/features/FullscreenWritingFocusVignette";
import FullscreenWritingFocusVignetteStyle from "@/features/FullscreenWritingFocusVignetteStyle";
import HighlightCurrentLine from "@/features/HighlightCurrentLine";
import HighlightCurrentLineOnlyInFocusedEditor from "@/features/HighlightCurrentLineOnlyInFocusedEditor";
import KeepLinesAboveAndBelow from "@/features/KeepLinesAboveAndBelow";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import LinesAboveAndBelow from "@/features/LinesAboveAndBelow";
import MaxCharsPerLine from "@/features/MaxCharsPerLine";
import OnlyActivateAfterFirstInteraction from "@/features/OnlyActivateAfterFirstInteraction";
import OnlyMaintainTypewriterOffsetWhenReached from "@/features/OnlyMaintainTypewriterOffsetWhenReached";
import PauseDimUnfocusedParagraphsWhileScrolling from "@/features/PauseDimUnfocusedParagraphsWhileScrolling";
import PauseDimUnfocusedParagraphsWhileSelecting from "@/features/PauseDimUnfocusedParagraphsWhileSelecting";
import TypewriterOffset from "@/features/TypewriterOffset";
import TypewriterOnlyUseCommands from "@/features/TypewriterOnlyUseCommands";
import TypewriterScroll from "@/features/TypewriterScroll";
import AnnounceUpdates from "./AnnounceUpdates";
import DisableInCanvas from "./DisableInCanvas";
import TogglePluginActivation from "./TogglePluginActivation";

export function getFeatures(plugin: TypewriterModePlugin) {
	return {
		TogglePluginActivation: new TogglePluginActivation(plugin),
		DisableInCanvas: new DisableInCanvas(plugin),
		TypewriterScroll: new TypewriterScroll(plugin),
		TypewriterOffset: new TypewriterOffset(plugin),
		OnlyMaintainTypewriterOffsetWhenReached:
			new OnlyMaintainTypewriterOffsetWhenReached(plugin),
		TypewriterOnlyUseCommands: new TypewriterOnlyUseCommands(plugin),
		KeepLinesAboveAndBelow: new KeepLinesAboveAndBelow(plugin),
		LinesAboveAndBelow: new LinesAboveAndBelow(plugin),
		HighlightCurrentLine: new HighlightCurrentLine(plugin),
		CurrentLineHighlightColorLight: new CurrentLineHighlightColorLight(plugin),
		CurrentLineHighlightColorDark: new CurrentLineHighlightColorDark(plugin),
		CurrentLineHighlightStyle: new CurrentLineHighlightStyle(plugin),
		CurrentLineHighlightUnderlineThickness:
			new CurrentLineHighlightUnderlineThickness(plugin),
		HighlightCurrentLineOnlyInFocusedEditor:
			new HighlightCurrentLineOnlyInFocusedEditor(plugin),
		DimUnfocusedParagraphs: new DimUnfocusedParagraphs(plugin),
		DimmedParagraphsOpacity: new DimmedParagraphsOpacity(plugin),
		PauseDimUnfocusedParagraphsWhileScrolling:
			new PauseDimUnfocusedParagraphsWhileScrolling(plugin),
		PauseDimUnfocusedParagraphsWhileSelecting:
			new PauseDimUnfocusedParagraphsWhileSelecting(plugin),
		DimUnfocusedEditorsBehavior: new DimUnfocusedEditorsBehavior(plugin),
		OnlyActivateAfterFirstInteraction: new OnlyActivateAfterFirstInteraction(
			plugin,
		),
		LimitMaxCharsPerLine: new LimitMaxCharsPerLine(plugin),
		MaxCharsPerLine: new MaxCharsPerLine(plugin),
		FullscreenWritingFocusShowsHeader: new FullscreenWritingFocusShowsHeader(
			plugin,
		),
		FullscreenWritingFocusVignette: new FullscreenWritingFocusVignette(plugin),
		FullscreenWritingFocusVignetteStyle:
			new FullscreenWritingFocusVignetteStyle(plugin),
		AnnounceUpdates: new AnnounceUpdates(plugin),
	};
}
