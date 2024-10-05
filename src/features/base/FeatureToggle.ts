import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export abstract class FeatureToggle extends Feature {
	protected toggleClass: string | null = null;
	public readonly isToggleClassPersistent: boolean = false;

	protected abstract hasCommand: boolean;
	protected commandTitle?: string;
	protected abstract settingTitle: string;
	protected abstract settingDesc: string;

	protected isSettingEnabled() {
		return true;
	}

	public getToggleClass() {
		return this.toggleClass;
	}

	private registerCommand() {
		if (this.hasCommand && this.commandTitle) {
			this.plugin.addCommand({
				id: this.setting as string,
				name: this.commandTitle,
				callback: this.toggle.bind(this),
			});
		}
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

	toggle(pNewValue: boolean | null = null) {
		// if no value is passed in, toggle the existing value
		let newValue = pNewValue;
		if (newValue === null) newValue = !this.plugin.settings[this.setting];

		// assign the new value and call the correct enable / disable function
		this.plugin.settings = {
			...this.plugin.settings,
			[this.setting]: newValue,
		};
		newValue ? this.enable() : this.disable();

		this.plugin.saveSettings().then();
	}

	override enable() {
		if (this.toggleClass) {
			const el = this.isToggleClassPersistent
				? "persistentBodyClasses"
				: "bodyClasses";
			if (!this.plugin.perWindowProps[el].contains(this.toggleClass)) {
				this.plugin.perWindowProps[el].push(this.toggleClass);
			}
		}
	}

	override disable() {
		if (this.toggleClass) {
			const el = this.isToggleClassPersistent
				? "persistentBodyClasses"
				: "bodyClasses";
			this.plugin.perWindowProps[el].remove(this.toggleClass);
		}
	}
}
