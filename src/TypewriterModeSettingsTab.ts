import { App, PluginSettingTab, Setting } from "obsidian";
import TypewriterModePlugin from "@/TypewriterModePlugin";

export default class TypewriterModeSettingTab extends PluginSettingTab {
  private plugin: TypewriterModePlugin;

  constructor(app: App, plugin: TypewriterModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Toggle Typewriter Scrolling")
      .setDesc("Turns typewriter scrolling on or off globally")
      .setClass("typewriter-mode-setting")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.enabled).onChange((newValue) => {
          this.plugin.toggleTypewriterScroll(newValue);
          this.display();
        })
      );

    new Setting(containerEl)
      .setName("Typewriter Offset")
      .setDesc(
        "Positions the typewriter line at the specified percentage of the screen"
      )
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.typewriterOffset * 100)
          .onChange((newValue) => {
            this.plugin.changeTypewriterOffset(newValue / 100);
          })
      )
      .setDisabled(!this.plugin.settings.enabled);

    new Setting(containerEl)
      .setName("Highlight Typewriter Line")
      .setDesc(
        "Highlights the line that the typewriter is currently on in the editor"
      )
      .setClass("typewriter-mode-setting")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.highlightTypewriterLineEnabled)
          .onChange((newValue) => {
            this.plugin.toggleHighlightTypewriterLine(newValue);
            this.display();
          })
      )
      .setDisabled(!this.plugin.settings.enabled);

    new Setting(containerEl)
      .setName("Typewriter Line Highlight Color")
      .setDesc("The color of the typewriter line highlight")
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.typewriterLineHighlightColor)
          .onChange((newValue) => {
            this.plugin.changeTypewriterLineHighlightColor(newValue);
          })
      )
      .setDisabled(
        !this.plugin.settings.enabled ||
          !this.plugin.settings.highlightTypewriterLineEnabled
      );

    new Setting(containerEl)
      .setName("Typewriter Line Highlight Style")
      .setDesc("The style of the typewriter line highlight")
      .setClass("typewriter-mode-setting")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("box", "Box")
          .addOption("underline", "Underline")
          .setValue(this.plugin.settings.typewriterLineHighlightStyle)
          .onChange((newValue) => {
            this.plugin.changeTypewriterLineHighlightStyle(
              newValue as "box" | "underline"
            );
          })
      );

    new Setting(containerEl)
      .setName("Typewriter Line Highlight Underline Thickness")
      .setDesc("The thickness of the underline")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(1, 5, 1)
          .setDynamicTooltip()
          .setValue(
            this.plugin.settings.typewriterLineHighlightUnderlineThickness
          )
          .onChange((newValue) => {
            this.plugin.changeTypewriterLineHighlightUnderlineThickness(
              newValue
            );
          })
      )
      .setDisabled(
        this.plugin.settings.typewriterLineHighlightStyle !== "underline"
      );

    new Setting(containerEl)
      .setName("Zen Mode")
      .setDesc("Darkens non-active paragraphs in the editor")
      .setClass("typewriter-mode-setting")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.zenEnabled)
          .onChange((newValue) => {
            this.plugin.toggleZen(newValue);
            this.display();
          })
      );

    new Setting(containerEl)
      .setName("Zen Opacity")
      .setDesc("The opacity of unfocused paragraphs in zen mode")
      .setClass("typewriter-mode-setting")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setDynamicTooltip()
          .setValue(this.plugin.settings.zenOpacity * 100)
          .onChange((newValue) => {
            this.plugin.changeZenOpacity(newValue / 100);
          })
      )
      .setDisabled(!this.plugin.settings.zenEnabled);

    new Setting(containerEl)
      .setName("Pause Zen Mode While Scrolling")
      .setDesc("Disables zen mode while scrolling")
      .setClass("typewriter-mode-setting")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.pauseZenWhileScrollingEnabled)
          .onChange((newValue) => {
            this.plugin.togglePauseZenWhileScrolling(newValue);
          })
      )
      .setDisabled(!this.plugin.settings.zenEnabled);

    new Setting(containerEl)
      .setName("Pause Zen Mode While Selecting Text")
      .setDesc("Disables zen mode while selecting text")
      .setClass("typewriter-mode-setting")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.pauseZenWhileSelectingEnabled)
          .onChange((newValue) => {
            this.plugin.togglePauseZenWhileSelecting(newValue);
          })
      )
      .setDisabled(!this.plugin.settings.zenEnabled);
  }
}
