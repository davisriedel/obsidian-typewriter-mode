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
import HighlightTypewriterLineOnlyInActiveEditor from "@/features/HighlightTypewriterLineOnlyInActiveEditor";
import LimitMaxCharsPerLine from "@/features/LimitMaxCharsPerLine";
import PauseZenWhileScrolling from "@/features/PauseZenWhileScrolling";
import PauseZenWhileSelecting from "@/features/PauseZenWhileSelecting";
import TypewriterScroll from "@/features/TypewriterScroll";
import Zen from "@/features/Zen";
import ZenOnlyInActiveEditor from "@/features/ZenOnlyInActiveEditor";
import { Feature } from "@/features/Feature";
import TypewriterOffset from "@/features/TypewriterOffset";
import TypewriterLineHighlightColor from "@/features/TypewriterLineHighlightColor";
import TypewriterLineHighlightStyle from "@/features/TypewriterLineHighlightStyle";
import TypewriterLineHighlightUnderlineThickness from "@/features/TypewriterLineHighlightUnderlineThickness";
import ZenOpacity from "@/features/ZenOpacity";
import MaxCharsPerLine from "@/features/MaxCharsPerLine";

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private editorExtensions: Extension[] = [];

  readonly features: Feature[] = [
    new TypewriterScroll(this),
    new TypewriterOffset(this),
    new LimitMaxCharsPerLine(this),
    new MaxCharsPerLine(this),
    new HighlightTypewriterLine(this),
    new TypewriterLineHighlightColor(this),
    new TypewriterLineHighlightStyle(this),
    new TypewriterLineHighlightUnderlineThickness(this),
    new HighlightTypewriterLineOnlyInActiveEditor(this),
    new Zen(this),
    new ZenOpacity(this),
    new PauseZenWhileScrolling(this),
    new PauseZenWhileSelecting(this),
    new ZenOnlyInActiveEditor(this),
  ];

  override async onload() {
    await this.loadSettings();
    this.features.forEach((feature) => feature.load());
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
      this.settings.enabled ? TypewriterScrollPlugin : [],
      this.settings.highlightTypewriterLineEnabled
        ? HighlightTypewriterLinePlugin
        : [],
      this.settings.highlightTypewriterLineEnabled || this.settings.zenEnabled
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
