import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class DimmedOpacity extends Feature {
	protected setting: keyof TypewriterModeSettings = "dimmedOpacity";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Opacity of dimmed elements")
			.setDesc("The opacity of dimmed elements")
			.setClass("typewriter-mode-setting")
			.addSlider((slider) =>
				slider
					.setLimits(0, 100, 5)
					.setDynamicTooltip()
					.setValue(this.plugin.settings.dimmedOpacity * 100)
					.onChange((newValue) => {
						this.changeDimmedOpacity(newValue / 100);
					}),
			);
	}

	override load() {
		this.plugin.setCSSVariable(
			"--dimmed-opacity",
			`${this.plugin.settings.dimmedOpacity}`,
		);
	}

	private changeDimmedOpacity(newValue = 0.25) {
		this.plugin.settings.dimmedOpacity = newValue;
		this.plugin.setCSSVariable("--dimmed-opacity", `${newValue}`);
		this.plugin.saveSettings();
	}
}
