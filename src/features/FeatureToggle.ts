import { PluginSettingTab, Setting } from "obsidian";
import { Feature } from "@/features/Feature";

export abstract class FeatureToggle extends Feature {
  protected abstract requiresReload: boolean;
  protected abstract hasCommand: boolean;
  protected commandTitle?: string;
  protected abstract settingTitle: string;
  protected abstract settingDesc: string;

  private registerCommand() {
    if (this.hasCommand)
      this.plugin.addCommand({
        id: this.setting as string,
        name: this.commandTitle,
        callback: this.toggle.bind(this),
      });
  }

  registerSetting(settingTab: PluginSettingTab) {
    new Setting(settingTab.containerEl)
      .setName(this.settingTitle)
      .setDesc(this.settingDesc)
      .setClass("typewriter-mode-setting")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings[this.setting] as boolean)
          .onChange((newValue) => {
            this.toggle(newValue);
            settingTab.display();
          })
      )
      .setDisabled(!this.isSettingEnabled());
  }

  override load() {
    this.registerCommand();
    this.plugin.settings[this.setting] ? this.enable() : this.disable();
  }

  toggle(newValue: boolean = null) {
    // if no value is passed in, toggle the existing value
    if (newValue === null) newValue = !this.plugin.settings[this.setting];

    // assign the new value and call the correct enable / disable function
    this.plugin.settings[this.setting] = newValue;
    newValue ? this.enable() : this.disable();

    this.plugin.saveSettings().then();
  }

  private reloadIfRequired() {
    // if the feature requires a reload, reload the codemirror instance
    if (this.requiresReload) this.plugin.reloadCodeMirror();
  }

  override enable() {
    this.reloadIfRequired();
  }

  override disable() {
    this.reloadIfRequired();
  }

  protected isSettingEnabled(): boolean {
    return true;
  }
}
