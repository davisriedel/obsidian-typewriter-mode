import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class LinesAboveAndBelow extends Feature {
	protected setting: keyof TypewriterModeSettings = "linesAboveAndBelow";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Amount of lines above and below the current line")
			.setDesc(
				"The amount of lines to always keep above and below the current line",
			)
			.setClass("typewriter-mode-setting")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.linesAboveAndBelow.toString())
					.onChange((newValue) => {
						this.changeAmountOfLinesAboveAndBelow(parseInt(newValue));
					}),
			)
			.setDisabled(!this.isSettingEnabled());
	}

	private changeAmountOfLinesAboveAndBelow(newValue: number) {
		this.plugin.settings.linesAboveAndBelow = newValue;
		this.plugin.saveSettings().then();
	}

	protected override isSettingEnabled(): boolean {
		return (
			super.isSettingEnabled() &&
			this.plugin.settings.isTypewriterScrollEnabled &&
			this.plugin.settings.isKeepLinesAboveAndBelowEnabled
		);
	}
}
