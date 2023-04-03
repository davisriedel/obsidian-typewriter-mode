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
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.enabled).onChange((newValue) => {
          this.plugin.toggleTypewriterScroll(newValue);
        })
      );

    new Setting(containerEl)
      .setName("Center offset")
      .setDesc(
        "Positions the typewriter text at the specified percentage of the screen"
      )
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setValue(this.plugin.settings.typewriterOffset * 100)
          .onChange((newValue) => {
            this.plugin.changeTypewriterOffset(newValue / 100);
          })
      );

    new Setting(containerEl)
      .setName("Zen Mode")
      .setDesc(
        "Darkens non-active lines in the editor, so you can focus on what you're typing"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.zenEnabled)
          .onChange((newValue) => {
            this.plugin.toggleZen(newValue);
          })
      );

    new Setting(containerEl)
      .setName("Zen Opacity")
      .setDesc("The opacity of unfocused lines in zen mode")
      .addSlider((slider) =>
        slider
          .setLimits(0, 100, 5)
          .setValue(this.plugin.settings.zenOpacity * 100)
          .onChange((newValue) => {
            this.plugin.changeZenOpacity(newValue / 100);
          })
      );

    new Setting(containerEl)
      .setName("Pause Zen Mode While Scrolling")
      .setDesc(
        "Disables zen mode while scrolling until the text is clicked again"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.pauseZenWhileScrollingEnabled)
          .onChange((newValue) => {
            this.plugin.togglePauseZenWhileScrolling(newValue);
          })
      );

    new Setting(containerEl)
      .setName("Highlight Typewriter Line")
      .setDesc(
        "Highlights the line that the typewriter is currently on in the editor"
      )
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.highlightTypewriterLineEnabled)
          .onChange((newValue) => {
            this.plugin.toggleHighlightTypewriterLine(newValue);
          })
      );

    new Setting(containerEl)
      .setName("Typewriter Line Highlight Color")
      .setDesc("The color of the typewriter line highlight")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.typewriterLineHighlightColor)
          .onChange((newValue) => {
            this.plugin.changeTypewriterLineHighlightColor(newValue);
          })
      );
  }
}
