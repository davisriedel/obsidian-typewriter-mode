import TypewriterModePlugin from "@/TypewriterModePlugin";

import CurrentLineHighlightColorDark from "@/features/CurrentLineHighlightColorDark";
import CurrentLineHighlightColorLight from "@/features/CurrentLineHighlightColorLight";
import CurrentLineHighlightStyle from "@/features/CurrentLineHighlightStyle";
import CurrentLineHighlightUnderlineThickness from "@/features/CurrentLineHighlightUnderlineThickness";
import DimUnfocused from "@/features/DimUnfocused";
import DimUnfocusedEditorsBehavior from "@/features/DimUnfocusedEditorsBehavior";
import DimmedOpacity from "@/features/DimmedOpacity";
import HighlightCurrentLine from "@/features/HighlightCurrentLine";
import HighlightCurrentLineOnlyInFocusedEditor from "@/features/HighlightCurrentLineOnlyInFocusedEditor";
import KeepLinesAboveAndBelow from "@/features/KeepLinesAboveAndBelow";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import LinesAboveAndBelow from "@/features/LinesAboveAndBelow";
import MaxCharsPerLine from "@/features/MaxCharsPerLine";
import OnlyActivateAfterFirstInteraction from "@/features/OnlyActivateAfterFirstInteraction";
import OnlyMaintainTypewriterOffsetWhenReached from "@/features/OnlyMaintainTypewriterOffsetWhenReached";
import PauseDimUnfocusedWhileScrolling from "@/features/PauseDimUnfocusedWhileScrolling";
import PauseDimUnfocusedWhileSelecting from "@/features/PauseDimUnfocusedWhileSelecting";
import TypewriterOffset from "@/features/TypewriterOffset";
import TypewriterOnlyUseCommands from "@/features/TypewriterOnlyUseCommands";
import TypewriterScroll from "@/features/TypewriterScroll";
import WritingFocusShowsHeader from "@/features/WritingFocusShowsHeader";
import WritingFocusVignette from "@/features/WritingFocusVignette";
import WritingFocusVignetteStyle from "@/features/WritingFocusVignetteStyle";
import AnnounceUpdates from "./AnnounceUpdates";
import DimUnfocusedMode from "./DimUnfocusedMode";
import DisableInCanvas from "./DisableInCanvas";
import TogglePluginActivation from "./TogglePluginActivation";
import WritingFocusIsFullScreen from "./WritingFocusIsFullscreen";
import WritingFocusShowsStatusBar from "./WritingFocusShowsStatusBar";
import type { Feature } from "./base/Feature";

export function getFeatures(
	plugin: TypewriterModePlugin,
): Record<string, Record<string, Feature>> {
	return {
		maxChar: [
			new LimitMaxCharsPerLine(plugin),
			new MaxCharsPerLine(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		writingFocus: [
			new WritingFocusShowsHeader(plugin),
			new WritingFocusShowsStatusBar(plugin),
			new WritingFocusIsFullScreen(plugin),
			new WritingFocusVignette(plugin),
			new WritingFocusVignetteStyle(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		general: [
			new TogglePluginActivation(plugin),
			new DisableInCanvas(plugin),
			new OnlyActivateAfterFirstInteraction(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		typewriter: [
			new TypewriterScroll(plugin),
			new TypewriterOffset(plugin),
			new OnlyMaintainTypewriterOffsetWhenReached(plugin),
			new TypewriterOnlyUseCommands(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		keepAboveAndBelow: [
			new KeepLinesAboveAndBelow(plugin),
			new LinesAboveAndBelow(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		currentLine: [
			new HighlightCurrentLine(plugin),
			new CurrentLineHighlightColorLight(plugin),
			new CurrentLineHighlightColorDark(plugin),
			new CurrentLineHighlightStyle(plugin),
			new CurrentLineHighlightUnderlineThickness(plugin),
			new HighlightCurrentLineOnlyInFocusedEditor(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		dimming: [
			new DimUnfocused(plugin),
			new DimUnfocusedMode(plugin),
			new DimmedOpacity(plugin),
			new PauseDimUnfocusedWhileScrolling(plugin),
			new PauseDimUnfocusedWhileSelecting(plugin),
			new DimUnfocusedEditorsBehavior(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),

		updates: [
			new AnnounceUpdates(plugin),
			// biome-ignore lint: reason
		].reduce((a, v) => ({ ...a, [v.constructor.name]: v }), {}),
	};
}
