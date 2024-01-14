import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export abstract class FeatureToggle extends Feature {
	protected toggleClass: string | null = null;
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
					}),
			)
			.setDisabled(!this.isSettingEnabled());
	}

	override load() {
		this.registerCommand();
		this.plugin.settings[this.setting] ? this.enable() : this.disable();
	}

	toggle(pNewValue: boolean = null) {
		// if no value is passed in, toggle the existing value
		let newValue = pNewValue;
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

	// override enable() {
	//   if (this.toggleClass) document.body.classList.add(this.toggleClass);
	//   this.reloadIfRequired();
	// }
	//
	// override disable() {
	//   if (this.toggleClass) document.body.classList.remove(this.toggleClass);
	//   this.reloadIfRequired();
	// }

	override enable() {
		if (this.toggleClass) {
			if (!this.plugin.perWindowProps.bodyClasses.contains(this.toggleClass)) {
				this.plugin.perWindowProps.bodyClasses.push(this.toggleClass);
			}
		}
		this.reloadIfRequired();
	}

	override disable() {
		if (this.toggleClass) {
			if (this.plugin.perWindowProps.bodyClasses.indexOf(this.toggleClass)) {
				this.plugin.perWindowProps.bodyClasses.remove(this.toggleClass);
			}
		}
		this.reloadIfRequired();
	}

	protected isSettingEnabled(): boolean {
		return true;
	}
}
