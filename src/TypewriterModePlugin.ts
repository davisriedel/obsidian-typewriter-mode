import {
  DEFAULT_SETTINGS,
  TypewriterModeSettings,
} from "@/TypewriterModeSettings";
import { Plugin } from "obsidian";
import TypewriterModeSettingTab from "@/TypewriterModeSettingsTab";
import { Extension } from "@codemirror/state";
import TypewriterScrollPlugin from "@/cm-plugin/TypewriterScrollPlugin";
import HighlightTypewriterLinePlugin from "@/cm-plugin/HighlightTypewriterLinePlugin";
import OnWheelPlugin from "@/cm-plugin/OnWheelPlugin";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import HighlightTypewriterLine from "@/features/HighlightTypewriterLine";
import HighlightTypewriterLineOnlyInFocusedEditor from "@/features/HighlightTypewriterLineOnlyInFocusedEditor";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import PauseDimUnfocusedParagraphsWhileScrolling from "@/features/PauseDimUnfocusedParagraphsWhileScrolling";
import PauseDimUnfocusedParagraphsWhileSelecting from "@/features/PauseDimUnfocusedParagraphsWhileSelecting";
import TypewriterScroll from "@/features/TypewriterScroll";
import DimUnfocusedParagraphs from "@/features/DimUnfocusedParagraphs";
import { Feature } from "@/features/base/Feature";
import TypewriterOffset from "@/features/TypewriterOffset";
import TypewriterLineHighlightColor from "@/features/TypewriterLineHighlightColor";
import TypewriterLineHighlightStyle from "@/features/TypewriterLineHighlightStyle";
import TypewriterLineHighlightUnderlineThickness from "@/features/TypewriterLineHighlightUnderlineThickness";
import DimmedParagraphsOpacity from "@/features/DimmedParagraphsOpacity";
import MaxCharsPerLine from "@/features/MaxCharsPerLine";
import { FullscreenWritingFocus } from "@/features/FullscreenWritingFocus";
import FullscreenWritingFocusShowsHeader from "@/features/FullscreenWritingFocusShowsHeader";
import FullscreenWritingFocusVignette from "@/features/FullscreenWritingFocusVignette";
import Loadable from "@/features/base/Loadable";
import { MoveTypewriter } from "@/features/MoveTypewriter";
import TypewriterOnlyUseCommands from "@/features/TypewriterOnlyUseCommands";
import DimUnfocusedEditorsBehavior from "@/features/DimUnfocusedEditorsBehavior";

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private editorExtensions: Extension[] = [];

  readonly features: Feature[] = [
    new TypewriterScroll(this),
    new TypewriterOnlyUseCommands(this),
    new TypewriterOffset(this),
    new LimitMaxCharsPerLine(this),
    new MaxCharsPerLine(this),
    new HighlightTypewriterLine(this),
    new TypewriterLineHighlightColor(this),
    new TypewriterLineHighlightStyle(this),
    new TypewriterLineHighlightUnderlineThickness(this),
    new HighlightTypewriterLineOnlyInFocusedEditor(this),
    new DimUnfocusedParagraphs(this),
    new DimmedParagraphsOpacity(this),
    new PauseDimUnfocusedParagraphsWhileScrolling(this),
    new PauseDimUnfocusedParagraphsWhileSelecting(this),
    new DimUnfocusedEditorsBehavior(this),
    new FullscreenWritingFocusShowsHeader(this),
    new FullscreenWritingFocusVignette(this),
  ];

  readonly commands: Loadable[] = [
    new FullscreenWritingFocus(this),
    new MoveTypewriter(this),
  ];

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
    if (this.editorExtensions.length !== 0) {
      // remove everything
      this.editorExtensions.splice(0, this.editorExtensions.length);
    }
    const extensions = [
      pluginSettingsFacet.of(this.settings),
      this.settings.isTypewriterScrollEnabled ? TypewriterScrollPlugin : [],
      this.settings.isHighlightTypewriterLineEnabled
        ? HighlightTypewriterLinePlugin
        : [],
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
