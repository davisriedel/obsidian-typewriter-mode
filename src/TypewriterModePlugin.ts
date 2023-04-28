import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { DEFAULT_SETTINGS } from "@/TypewriterModeSettings";
import { Plugin } from "obsidian";
import TypewriterModeSettingTab from "@/TypewriterModeSettingsTab";
import type { Extension } from "@codemirror/state";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import HighlightCurrentLine from "@/features/HighlightCurrentLine";
import HighlightCurrentLineOnlyInFocusedEditor from "@/features/HighlightCurrentLineOnlyInFocusedEditor";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import PauseDimUnfocusedParagraphsWhileScrolling from "@/features/PauseDimUnfocusedParagraphsWhileScrolling";
import PauseDimUnfocusedParagraphsWhileSelecting from "@/features/PauseDimUnfocusedParagraphsWhileSelecting";
import TypewriterScroll from "@/features/TypewriterScroll";
import DimUnfocusedParagraphs from "@/features/DimUnfocusedParagraphs";
import TypewriterOffset from "@/features/TypewriterOffset";
import CurrentLineHighlightColor from "@/features/CurrentLineHighlightColor";
import CurrentLineHighlightStyle from "@/features/CurrentLineHighlightStyle";
import CurrentLineHighlightUnderlineThickness from "@/features/CurrentLineHighlightUnderlineThickness";
import DimmedParagraphsOpacity from "@/features/DimmedParagraphsOpacity";
import MaxCharsPerLine from "@/features/MaxCharsPerLine";
import { FullscreenWritingFocus } from "@/features/FullscreenWritingFocus";
import FullscreenWritingFocusShowsHeader from "@/features/FullscreenWritingFocusShowsHeader";
import FullscreenWritingFocusVignette from "@/features/FullscreenWritingFocusVignette";
import { MoveTypewriter } from "@/features/MoveTypewriter";
import TypewriterOnlyUseCommands from "@/features/TypewriterOnlyUseCommands";
import DimUnfocusedEditorsBehavior from "@/features/DimUnfocusedEditorsBehavior";
import OnlyMaintainTypewriterOffsetWhenReached from "@/features/OnlyMaintainTypewriterOffsetWhenReached";
import CodeMirrorPlugin from "@/cm-plugin/CMTypewriterModePlugin";
import OnlyActivateAfterFirstInteraction from "@/features/OnlyActivateAfterFirstInteraction";
import { ToggleTypewriterAndDimming } from "@/features/ToggleTypewriterAndDimming";
import KeepLinesAboveAndBelow from "@/features/KeepLinesAboveAndBelow";
import LinesAboveAndBelow from "@/features/LinesAboveAndBelow";
import FullscreenWritingFocusVignetteStyle from "@/features/FullscreenWritingFocusVignetteStyle";

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private editorExtensions: Extension[] = [];

  readonly features = {
    TypewriterScroll: new TypewriterScroll(this),
    TypewriterOffset: new TypewriterOffset(this),
    OnlyMaintainTypewriterOffsetWhenReached:
      new OnlyMaintainTypewriterOffsetWhenReached(this),
    TypewriterOnlyUseCommands: new TypewriterOnlyUseCommands(this),
    KeepLinesAboveAndBelow: new KeepLinesAboveAndBelow(this),
    LinesAboveAndBelow: new LinesAboveAndBelow(this),
    HighlightCurrentLine: new HighlightCurrentLine(this),
    CurrentLineHighlightColor: new CurrentLineHighlightColor(this),
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
      this
    ),
    LimitMaxCharsPerLine: new LimitMaxCharsPerLine(this),
    MaxCharsPerLine: new MaxCharsPerLine(this),
    FullscreenWritingFocusShowsHeader: new FullscreenWritingFocusShowsHeader(
      this
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
    await this.loadSettings();
    Object.values(this.features).forEach((feature) => feature.load());
    Object.values(this.commands).forEach((command) => command.load());
    this.addSettingTab(new TypewriterModeSettingTab(this.app, this));
    this.registerEditorExtension(this.editorExtensions);
  }

  override onunload() {
    Object.values(this.features).forEach((feature) => feature.disable());
  }

  reloadCodeMirror() {
    this.editorExtensions.splice(0, this.editorExtensions.length);
    const extensions = [
      pluginSettingsFacet.of(this.settings),
      CodeMirrorPlugin,
    ];
    this.editorExtensions.push(extensions);
    this.app.workspace.updateOptions();
  }

  private async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  setCSSVariable(property: string, value: string) {
    const r = document.querySelector(":root") as HTMLElement;
    r.style.setProperty(property, value);
  }
}
