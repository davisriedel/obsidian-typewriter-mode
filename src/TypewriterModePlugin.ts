import {
  DEFAULT_SETTINGS,
  TypewriterModeSettings,
} from "@/TypewriterModeSettings";
import { Plugin } from "obsidian";
import CMTypewriterScrollSettingTab from "@/TypewriterModeSettingsTab";
import { Extension } from "@codemirror/state";
import TypewriterScrollPlugin from "@/cm-plugin/TypewriterScrollPlugin";
import HighlightTypewriterLinePlugin from "@/cm-plugin/HighlightTypewriterLinePlugin";
import OnWheelPlugin from "@/cm-plugin/OnWheelPlugin";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private css: HTMLElement;
  private editorExtensions: Extension[] = [];

  override async onload() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());

    // enable the plugin (based on settings)
    if (this.settings.enabled) this.enableTypewriterScroll();
    if (this.settings.zenEnabled) this.enableZen();
    if (this.settings.highlightTypewriterLineEnabled)
      this.enableHighlightTypewriterLine();
    if (this.settings.pauseZenWhileScrollingEnabled)
      this.enablePauseZenWhileScrolling();

    this.css = document.createElement("style");
    this.css.id = "plugin-typewriter-scroll";
    this.css.setAttr("type", "text/css");
    document.getElementsByTagName("head")[0].appendChild(this.css);
    this.css.innerText = `body {
      --zen-opacity: ${this.settings.zenOpacity};
      --typewriter-line-color: ${this.settings.typewriterLineHighlightColor};
    }`;

    // add the settings tab
    this.addSettingTab(new CMTypewriterScrollSettingTab(this.app, this));

    // add the commands / keyboard shortcuts
    this.addCommands();

    // register the codemirror add on setting
    this.registerEditorExtension(this.editorExtensions);
  }

  override onunload() {
    // disable the plugin
    this.disableTypewriterScroll();
    this.disableZen();
    this.disableHighlightTypewriterLine();
  }

  private addCommands() {
    // add the toggle on/off command
    this.addCommand({
      id: "toggle-typewriter-scroll",
      name: "Toggle Typewriter Mode On/Off",
      callback: () => {
        this.toggleTypewriterScroll();
      },
    });

    // toggle zen mode
    this.addCommand({
      id: "toggle-typewriter-scroll-zen",
      name: "Toggle Zen Mode On/Off",
      callback: () => {
        this.toggleZen();
      },
    });

    // toggle highlight typewriter line
    this.addCommand({
      id: "toggle-typewriter-scroll-highlight-typewriter-line",
      name: "Toggle Highlight Typewriter Line On/Off",
      callback: () => {
        this.toggleHighlightTypewriterLine();
      },
    });
  }

  private reloadCodeMirror() {
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

  private toggleSetting(
    setting: keyof typeof this.settings,
    newValue: boolean = null,
    enable: () => void,
    disable: () => void,
    requiresReload = false
  ) {
    // if no value is passed in, toggle the existing value
    if (newValue === null) newValue = !this.settings[setting];
    // assign the new value and call the correct enable / disable function
    this.settings[setting] = newValue;
    newValue ? enable() : disable();
    if (requiresReload && this.settings.enabled) this.reloadCodeMirror();
    // save the new settings
    this.saveData(this.settings).then();
  }

  toggleTypewriterScroll(newValue: boolean = null) {
    this.toggleSetting(
      "enabled",
      newValue,
      this.enableTypewriterScroll.bind(this),
      this.disableTypewriterScroll.bind(this),
      true
    );
  }

  toggleZen(newValue: boolean = null) {
    this.toggleSetting(
      "zenEnabled",
      newValue,
      this.enableZen.bind(this),
      this.disableZen.bind(this),
      true
    );
  }

  togglePauseZenWhileScrolling(newValue: boolean = null) {
    this.toggleSetting(
      "pauseZenWhileScrollingEnabled",
      newValue,
      this.enablePauseZenWhileScrolling.bind(this),
      this.disablePauseZenWhileScrolling.bind(this)
    );
  }

  toggleHighlightTypewriterLine(newValue: boolean = null) {
    this.toggleSetting(
      "highlightTypewriterLineEnabled",
      newValue,
      this.enableHighlightTypewriterLine.bind(this),
      this.disableHighlightTypewriterLine.bind(this),
      true
    );
  }

  changeTypewriterOffset(newValue: number) {
    this.settings.typewriterOffset = newValue;
    if (this.settings.enabled) this.reloadCodeMirror();
    this.saveData(this.settings).then();
  }

  changeZenOpacity(newValue = 0.25) {
    this.settings.zenOpacity = newValue;
    this.css.innerText = `body {
      --zen-opacity: ${newValue};
      --typewriter-line-color: ${this.settings.typewriterLineHighlightColor};
    }`;
    // save the new settings
    this.saveData(this.settings).then();
  }

  changeTypewriterLineHighlightColor(newValue: string) {
    this.settings.typewriterLineHighlightColor = newValue;
    this.css.innerText = `body {
      --zen-opacity: ${this.settings.zenOpacity};
      --typewriter-line-color: ${newValue};
    }`;
    // save the new settings
    this.saveData(this.settings).then();
  }

  changeTypewriterLineHighlightStyle(newValue: "box" | "underline") {
    this.settings.typewriterLineHighlightStyle = newValue;
    if (this.settings.enabled) this.reloadCodeMirror();
    this.saveData(this.settings).then();
  }

  private enableTypewriterScroll() {
    // add the class
    document.body.classList.add("plugin-typewriter-mode");

    // register the codemirror add on setting
    this.registerCodeMirror((cm) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cm.setOption("typewriterScrolling", true);
    });

    this.reloadCodeMirror();
  }

  private disableTypewriterScroll() {
    // remove the class
    document.body.classList.remove("plugin-typewriter-mode");

    // remove the codemirror add on setting
    this.app.workspace.iterateCodeMirrors((cm) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cm.setOption("typewriterScrolling", false);
    });

    // clear out the registered extension
    this.editorExtensions.splice(0, this.editorExtensions.length);
    this.app.workspace.updateOptions();
  }

  private enableZen() {
    // add the class
    document.body.classList.add("plugin-typewriter-mode-zen");
  }

  private disableZen() {
    // remove the class
    document.body.classList.remove("plugin-typewriter-mode-zen");
  }

  private enablePauseZenWhileScrolling() {
    // add the class
    document.body.classList.add(
      "plugin-typewriter-mode-zen-pause-while-scrolling"
    );
  }

  private disablePauseZenWhileScrolling() {
    // remove the class
    document.body.classList.remove(
      "plugin-typewriter-mode-zen-pause-while-scrolling"
    );
  }

  private enableHighlightTypewriterLine() {
    // add the class
    document.body.classList.add("plugin-typewriter-mode-highlight-line");
  }

  private disableHighlightTypewriterLine() {
    // remove the class
    document.body.classList.remove("plugin-typewriter-mode-highlight-line");
  }
}
