import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class DimmedOpacity extends Feature {
	public settingKey: keyof TypewriterModeSettings = "dimmedOpacity";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Opacity of dimmed elements")
			.setDesc("The opacity of dimmed elements")
			.setClass("typewriter-mode-setting")
			.addSlider((slider) =>
				slider
					.setLimits(0, 100, 5)
					.setDynamicTooltip()
					.setValue(this.tm.settings.dimmedOpacity * 100)
					.onChange((newValue) => {
						this.changeDimmedOpacity(newValue / 100);
					}),
			);
	}

	override load() {
		this.tm.setCSSVariable(
			"--dimmed-opacity",
			`${this.tm.settings.dimmedOpacity}`,
		);
	}

	private changeDimmedOpacity(newValue = 0.25) {
		this.tm.settings.dimmedOpacity = newValue;
		this.tm.setCSSVariable("--dimmed-opacity", `${newValue}`);
		this.tm.saveSettings();
	}
}
