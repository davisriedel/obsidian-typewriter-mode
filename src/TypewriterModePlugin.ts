import {
  DEFAULT_SETTINGS,
  TypewriterModeSettings,
} from "@/TypewriterModeSettings";
import { Plugin } from "obsidian";
import { Extension } from "@codemirror/state";
import CMTypewriterScrollSettingTab from "@/TypewriterModeSettingsTab";
import { resetTypewriterScroll, typewriterScroll } from "@/cm-plugin";

export default class TypewriterModePlugin extends Plugin {
  settings: TypewriterModeSettings;
  private css: HTMLElement;
  private ext: Extension;
  private extArray: Extension[] = [];

  override async onload() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());

    // enable the plugin (based on settings)
    if (this.settings.enabled) this.enableTypewriterScroll();
    if (this.settings.zenEnabled) this.enableZen();
    if (this.settings.highlightTypewriterLineEnabled)
      this.enableHighlightTypewriterLine();

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
      id: "toggle-typewriter-sroll",
      name: "Toggle On/Off",
      callback: () => {
        this.toggleTypewriterScroll();
      },
    });

    // toggle zen mode
    this.addCommand({
      id: "toggle-typewriter-sroll-zen",
      name: "Toggle Zen Mode On/Off",
      callback: () => {
        this.toggleZen();
      },
    });

    // toggle highlight typewriter line
    this.addCommand({
      id: "toggle-typewriter-sroll-highlight-typewriter-line",
      name: "Toggle Highlight Typewriter Line On/Off",
      callback: () => {
        this.toggleHighlightTypewriterLine();
      },
    });
  }

  toggleTypewriterScroll = (newValue: boolean = null) => {
    // if no value is passed in, toggle the existing value
    if (newValue === null) newValue = !this.settings.enabled;
    // assign the new value and call the correct enable / disable function
    this.settings.enabled = newValue;
    newValue ? this.enableTypewriterScroll() : this.disableTypewriterScroll();
    // save the new settings
    this.saveData(this.settings).then();
  };

  changeTypewriterOffset = (newValue: number) => {
    this.settings.typewriterOffset = newValue;
    if (this.settings.enabled) {
      this.disableTypewriterScroll();
      this.disableHighlightTypewriterLine();
      // delete the extension, so it gets recreated with the new value
      delete this.ext;
      this.enableTypewriterScroll();
      if (this.settings.highlightTypewriterLineEnabled)
        this.enableHighlightTypewriterLine();
    }
    this.saveData(this.settings).then();
  };

  toggleZen = (newValue: boolean = null) => {
    // if no value is passed in, toggle the existing value
    if (newValue === null) newValue = !this.settings.zenEnabled;
    // assign the new value and call the correct enable / disable function
    this.settings.zenEnabled = newValue;
    newValue ? this.enableZen() : this.disableZen();
    // save the new settings
    this.saveData(this.settings).then();
  };

  changeZenOpacity = (newValue = 0.25) => {
    this.settings.zenOpacity = newValue;
    this.css.innerText = `body {
      --zen-opacity: ${newValue};
      --typewriter-line-color: ${this.settings.typewriterLineHighlightColor};
    }`;
    // save the new settings
    this.saveData(this.settings).then();
  };

  private enableTypewriterScroll = () => {
    // add the class
    document.body.classList.add("plugin-typewriter-mode");

    // register the codemirror add on setting
    this.registerCodeMirror((cm) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cm.setOption("typewriterScrolling", true);
    });

    if (!this.ext) {
      this.ext = typewriterScroll({
        typewriterOffset: this.settings.typewriterOffset,
      });
      this.extArray = [this.ext];
      this.registerEditorExtension(this.extArray);
    } else {
      this.extArray.splice(0, this.extArray.length);
      this.extArray.push(this.ext);
      this.app.workspace.updateOptions();
    }
  };

  private disableTypewriterScroll = () => {
    // remove the class
    document.body.classList.remove("plugin-typewriter-mode");

    // remove the codemirror add on setting
    this.app.workspace.iterateCodeMirrors((cm) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cm.setOption("typewriterScrolling", false);
    });

    // clear out the registered extension
    this.extArray.splice(0, this.extArray.length);
    this.extArray.push(resetTypewriterScroll());
    this.app.workspace.updateOptions();
  };

  private enableZen = () => {
    // add the class
    document.body.classList.add("plugin-typewriter-mode-zen");
  };

  private disableZen = () => {
    // remove the class
    document.body.classList.remove("plugin-typewriter-mode-zen");
  };

  togglePauseZenWhileScrolling = (newValue: boolean = null) => {
    // if no value is passed in, toggle the existing value
    if (newValue === null)
      newValue = !this.settings.pauseZenWhileScrollingEnabled;
    // assign the new value and call the correct enable / disable function
    this.settings.pauseZenWhileScrollingEnabled = newValue;
    newValue
      ? this.enablePauseZenWhileScrolling()
      : this.disablePauseZenWhileScrolling();
    // save the new settings
    this.saveData(this.settings).then();
  };

  private enablePauseZenWhileScrolling = () => {
    // add the class
    document.body.classList.add(
      "plugin-typewriter-mode-zen-pause-while-scrolling"
    );
  };

  private disablePauseZenWhileScrolling = () => {
    // remove the class
    document.body.classList.remove(
      "plugin-typewriter-mode-zen-pause-while-scrolling"
    );
  };

  toggleHighlightTypewriterLine = (newValue: boolean = null) => {
    // if no value is passed in, toggle the existing value
    if (newValue === null)
      newValue = !this.settings.highlightTypewriterLineEnabled;
    // assign the new value and call the correct enable / disable function
    this.settings.highlightTypewriterLineEnabled = newValue;
    newValue
      ? this.enableHighlightTypewriterLine()
      : this.disableHighlightTypewriterLine();
    // save the new settings
    this.saveData(this.settings).then();
  };

  private enableHighlightTypewriterLine = () => {
    // add the class
    document.body.classList.add("plugin-typewriter-mode-highlight-line");
  };

  private disableHighlightTypewriterLine = () => {
    // remove the class
    document.body.classList.remove("plugin-typewriter-mode-highlight-line");
  };

  changeTypewriterLineHighlightColor = (newValue: string) => {
    this.settings.typewriterLineHighlightColor = newValue;
    this.css.innerText = `body {
      --zen-opacity: ${this.settings.zenOpacity};
      --typewriter-line-color: ${newValue};
    }`;
    // save the new settings
    this.saveData(this.settings).then();
  };
}
