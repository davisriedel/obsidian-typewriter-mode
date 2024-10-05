import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class FadeLinesIntensity extends Feature {
	protected setting: keyof TypewriterModeSettings = "fadeLinesIntensity";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Intensity of the fade lines gradient")
			.setDesc("How soon lines shall be faded out")
			.setClass("typewriter-mode-setting")
			.addSlider((slider) =>
				slider
					.setLimits(0, 100, 5)
					.setDynamicTooltip()
					.setValue(this.plugin.settings.fadeLinesIntensity * 100)
					.onChange((newValue) => {
						this.changeFadeLinesIntensity(newValue / 100);
					}),
			);
	}

	override load() {
		this.plugin.setCSSVariable(
			"--ptm-fade-lines-intensity",
			`${this.plugin.settings.fadeLinesIntensity * 100}%`,
		);
	}

	private changeFadeLinesIntensity(newValue = 0.5) {
		this.plugin.settings.fadeLinesIntensity = newValue;
		this.plugin.setCSSVariable(
			"--ptm-fade-lines-intensity",
			`${newValue * 100}%`,
		);
		this.plugin.saveSettings();
	}
}
