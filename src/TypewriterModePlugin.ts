import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { DEFAULT_SETTINGS } from "@/TypewriterModeSettings";
import { Plugin } from "obsidian";
import TypewriterModeSettingTab from "@/TypewriterModeSettingsTab";
import type { Extension } from "@codemirror/state";
import OnWheelPlugin from "@/cm-plugin/CMOnWheelPlugin";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import HighlightTypewriterLine from "@/features/HighlightTypewriterLine";
import HighlightTypewriterLineOnlyInFocusedEditor from "@/features/HighlightTypewriterLineOnlyInFocusedEditor";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import PauseDimUnfocusedParagraphsWhileScrolling from "@/features/PauseDimUnfocusedParagraphsWhileScrolling";
import PauseDimUnfocusedParagraphsWhileSelecting from "@/features/PauseDimUnfocusedParagraphsWhileSelecting";
import TypewriterScroll from "@/features/TypewriterScroll";
import DimUnfocusedParagraphs from "@/features/DimUnfocusedParagraphs";
import TypewriterOffset from "@/features/TypewriterOffset";
import TypewriterLineHighlightColor from "@/features/TypewriterLineHighlightColor";
import TypewriterLineHighlightStyle from "@/features/TypewriterLineHighlightStyle";
import TypewriterLineHighlightUnderlineThickness from "@/features/TypewriterLineHighlightUnderlineThickness";
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

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private editorExtensions: Extension[] = [];

  readonly features = {
    TypewriterScroll: new TypewriterScroll(this),
    TypewriterOffset: new TypewriterOffset(this),
    OnlyMaintainTypewriterOffsetWhenReached:
      new OnlyMaintainTypewriterOffsetWhenReached(this),
    TypewriterOnlyUseCommands: new TypewriterOnlyUseCommands(this),
    OnlyActivateAfterFirstInteraction: new OnlyActivateAfterFirstInteraction(
      this
    ),
    HighlightTypewriterLine: new HighlightTypewriterLine(this),
    TypewriterLineHighlightColor: new TypewriterLineHighlightColor(this),
    TypewriterLineHighlightStyle: new TypewriterLineHighlightStyle(this),
    TypewriterLineHighlightUnderlineThickness:
      new TypewriterLineHighlightUnderlineThickness(this),
    HighlightTypewriterLineOnlyInFocusedEditor:
      new HighlightTypewriterLineOnlyInFocusedEditor(this),
    DimUnfocusedParagraphs: new DimUnfocusedParagraphs(this),
    DimmedParagraphsOpacity: new DimmedParagraphsOpacity(this),
    PauseDimUnfocusedParagraphsWhileScrolling:
      new PauseDimUnfocusedParagraphsWhileScrolling(this),
    PauseDimUnfocusedParagraphsWhileSelecting:
      new PauseDimUnfocusedParagraphsWhileSelecting(this),
    DimUnfocusedEditorsBehavior: new DimUnfocusedEditorsBehavior(this),
    LimitMaxCharsPerLine: new LimitMaxCharsPerLine(this),
    MaxCharsPerLine: new MaxCharsPerLine(this),
    FullscreenWritingFocusShowsHeader: new FullscreenWritingFocusShowsHeader(
      this
    ),
    FullscreenWritingFocusVignette: new FullscreenWritingFocusVignette(this),
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
      this.settings.isHighlightTypewriterLineEnabled ||
      this.settings.isDimUnfocusedParagraphsEnabled
        ? OnWheelPlugin
        : [],
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
