import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";
import { Feature } from "./Feature";

export abstract class FeatureToggle extends Feature {
	protected toggleClass: string | null = null;
	public readonly isToggleClassPersistent: boolean = false;

	protected abstract settingTitle: string;
	protected abstract settingDesc: string;

	protected isSettingEnabled() {
		return true;
	}

	public getToggleClass() {
		return this.toggleClass;
	}

	registerSetting(settingTab: PluginSettingTab) {
		new Setting(settingTab.containerEl)
			.setName(this.settingTitle)
			.setDesc(this.settingDesc)
			.setClass("typewriter-mode-setting")
			.addToggle((toggle) =>
				toggle
					.setValue(this.getSettingValue() as boolean)
					.onChange((newValue) => {
						this.toggle(newValue);
						settingTab.display();
					}),
			)
			.setDisabled(!this.isSettingEnabled());
	}

	override load() {
		this.tm.settings[this.settingKey] ? this.enable() : this.disable();
	}

	toggle(pNewValue: boolean | null = null) {
		// if no value is passed in, toggle the existing value
		let newValue = pNewValue;
		if (newValue === null) newValue = !this.getSettingValue();

		// assign the new value and call the correct enable / disable function
		this.tm.settings = {
			...this.tm.settings,
			[this.settingKey]: newValue,
		};
		newValue ? this.enable() : this.disable();

		this.tm.saveSettings().then();
	}

	override enable() {
		if (this.toggleClass) {
			const el = this.isToggleClassPersistent
				? "persistentBodyClasses"
				: "bodyClasses";
			if (!this.tm.perWindowProps[el].contains(this.toggleClass)) {
				this.tm.perWindowProps[el].push(this.toggleClass);
			}
		}
	}

	override disable() {
		if (this.toggleClass) {
			const el = this.isToggleClassPersistent
				? "persistentBodyClasses"
				: "bodyClasses";
			this.tm.perWindowProps[el].remove(this.toggleClass);
		}
	}
}
