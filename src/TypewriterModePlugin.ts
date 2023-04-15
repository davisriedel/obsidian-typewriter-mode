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

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private editorExtensions: Extension[] = [];

  readonly features = [
    TypewriterScroll,
    TypewriterOffset,
    OnlyMaintainTypewriterOffsetWhenReached,
    TypewriterOnlyUseCommands,
    HighlightTypewriterLine,
    TypewriterLineHighlightColor,
    TypewriterLineHighlightStyle,
    TypewriterLineHighlightUnderlineThickness,
    HighlightTypewriterLineOnlyInFocusedEditor,
    DimUnfocusedParagraphs,
    DimmedParagraphsOpacity,
    PauseDimUnfocusedParagraphsWhileScrolling,
    PauseDimUnfocusedParagraphsWhileSelecting,
    DimUnfocusedEditorsBehavior,
    LimitMaxCharsPerLine,
    MaxCharsPerLine,
    FullscreenWritingFocusShowsHeader,
    FullscreenWritingFocusVignette,
  ].map((f) => new f(this));

  readonly commands = [FullscreenWritingFocus, MoveTypewriter].map(
    (c) => new c(this)
  );

  override async onload() {
    await this.loadSettings();
    this.features.forEach((feature) => feature.load());
    this.commands.forEach((command) => command.load());
    this.addSettingTab(new TypewriterModeSettingTab(this.app, this));
    this.registerEditorExtension(this.editorExtensions);
  }

  override onunload() {
    this.features.forEach((feature) => feature.disable());
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
