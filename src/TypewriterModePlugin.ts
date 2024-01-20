import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { DEFAULT_SETTINGS } from "@/TypewriterModeSettings";
import TypewriterModeSettingTab from "@/TypewriterModeSettingsTab";
import CodeMirrorPlugin from "@/cm-plugin/CMTypewriterModePlugin";
import type { PerWindowProps } from "@/cm-plugin/PerWindowProps";
import { perWindowProps } from "@/cm-plugin/PerWindowProps";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import CurrentLineHighlightColorDark from "@/features/CurrentLineHighlightColorDark";
import CurrentLineHighlightColorLight from "@/features/CurrentLineHighlightColorLight";
import CurrentLineHighlightStyle from "@/features/CurrentLineHighlightStyle";
import CurrentLineHighlightUnderlineThickness from "@/features/CurrentLineHighlightUnderlineThickness";
import DimUnfocusedEditorsBehavior from "@/features/DimUnfocusedEditorsBehavior";
import DimUnfocusedParagraphs from "@/features/DimUnfocusedParagraphs";
import DimmedParagraphsOpacity from "@/features/DimmedParagraphsOpacity";
import { FullscreenWritingFocus } from "@/features/FullscreenWritingFocus";
import FullscreenWritingFocusShowsHeader from "@/features/FullscreenWritingFocusShowsHeader";
import FullscreenWritingFocusVignette from "@/features/FullscreenWritingFocusVignette";
import FullscreenWritingFocusVignetteStyle from "@/features/FullscreenWritingFocusVignetteStyle";
import HighlightCurrentLine from "@/features/HighlightCurrentLine";
import HighlightCurrentLineOnlyInFocusedEditor from "@/features/HighlightCurrentLineOnlyInFocusedEditor";
import KeepLinesAboveAndBelow from "@/features/KeepLinesAboveAndBelow";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import LinesAboveAndBelow from "@/features/LinesAboveAndBelow";
import MaxCharsPerLine from "@/features/MaxCharsPerLine";
import { MoveTypewriter } from "@/features/MoveTypewriter";
import OnlyActivateAfterFirstInteraction from "@/features/OnlyActivateAfterFirstInteraction";
import OnlyMaintainTypewriterOffsetWhenReached from "@/features/OnlyMaintainTypewriterOffsetWhenReached";
import PauseDimUnfocusedParagraphsWhileScrolling from "@/features/PauseDimUnfocusedParagraphsWhileScrolling";
import PauseDimUnfocusedParagraphsWhileSelecting from "@/features/PauseDimUnfocusedParagraphsWhileSelecting";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";
import TypewriterOffset from "@/features/TypewriterOffset";
import TypewriterOnlyUseCommands from "@/features/TypewriterOnlyUseCommands";
import TypewriterScroll from "@/features/TypewriterScroll";
import type { Extension } from "@codemirror/state";
import { Plugin } from "obsidian";

export default class TypewriterModePlugin extends Plugin {
	settings: TypewriterModeSettings;
	perWindowProps: PerWindowProps = {
		cssVariables: {},
		bodyClasses: [],
		bodyAttrs: {},
	};
	private editorExtensions: Extension[] = [CodeMirrorPlugin, []];

	readonly features = {
		TypewriterScroll: new TypewriterScroll(this),
		TypewriterOffset: new TypewriterOffset(this),
		OnlyMaintainTypewriterOffsetWhenReached:
			new OnlyMaintainTypewriterOffsetWhenReached(this),
		TypewriterOnlyUseCommands: new TypewriterOnlyUseCommands(this),
		KeepLinesAboveAndBelow: new KeepLinesAboveAndBelow(this),
		LinesAboveAndBelow: new LinesAboveAndBelow(this),
		HighlightCurrentLine: new HighlightCurrentLine(this),
		CurrentLineHighlightColorLight: new CurrentLineHighlightColorLight(this),
		CurrentLineHighlightColorDark: new CurrentLineHighlightColorDark(this),
		CurrentLineHighlightStyle: new CurrentLineHighlightStyle(this),
		CurrentLineHighlightUnderlineThickness:
			new CurrentLineHighlightUnderlineThickness(this),
		HighlightCurrentLineOnlyInFocusedEditor:
			new HighlightCurrentLineOnlyInFocusedEditor(this),
		DimUnfocusedParagraphs: new DimUnfocusedParagraphs(this),
		DimmedParagraphsOpacity: new DimmedParagraphsOpacity(this),
		PauseDimUnfocusedParagraphsWhileScrolling:
			new PauseDimUnfocusedParagraphsWhileScrolling(this),
		PauseDimUnfocusedParagraphsWhileSelecting:
			new PauseDimUnfocusedParagraphsWhileSelecting(this),
		DimUnfocusedEditorsBehavior: new DimUnfocusedEditorsBehavior(this),
		OnlyActivateAfterFirstInteraction: new OnlyActivateAfterFirstInteraction(
			this,
		),
		LimitMaxCharsPerLine: new LimitMaxCharsPerLine(this),
		MaxCharsPerLine: new MaxCharsPerLine(this),
		FullscreenWritingFocusShowsHeader: new FullscreenWritingFocusShowsHeader(
			this,
		),
		FullscreenWritingFocusVignette: new FullscreenWritingFocusVignette(this),
		FullscreenWritingFocusVignetteStyle:
			new FullscreenWritingFocusVignetteStyle(this),
	};

	readonly commands = {
		ToggleTypewriterAndDimming: new ToggleTypewriterAndDimming(this),
		MoveTypewriter: new MoveTypewriter(this),
		FullscreenWritingFocus: new FullscreenWritingFocus(this),
	};

	override async onload() {
		const settingsData = await this.loadData();
		this.settings = Object.assign(DEFAULT_SETTINGS, settingsData);
		for (const feature of Object.values(this.features)) feature.load();
		for (const command of Object.values(this.commands)) command.load();
		this.addSettingTab(new TypewriterModeSettingTab(this.app, this));
		this.updateFacets();
		this.registerEditorExtension(this.editorExtensions);
	}

	override onunload() {
		for (const feature of Object.values(this.features)) feature.disable();
	}

	private updateFacets() {
		this.editorExtensions[1] = [
			pluginSettingsFacet.of(this.settings),
			perWindowProps.of(this.perWindowProps),
		];
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.updateFacets();
		this.app.workspace.updateOptions();
	}

	setCSSVariable(property: string, value: string) {
		this.perWindowProps.cssVariables[property] = value;
	}
}
