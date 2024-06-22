import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class MaxCharsPerLine extends Feature {
	protected setting: keyof TypewriterModeSettings = "maxCharsPerLine";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Maximum number of characters per line")
			.setDesc("The maximum number of characters per line")
			.setClass("typewriter-mode-setting")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.maxCharsPerLine.toString())
					.onChange((newValue) => {
						this.changeMaxCharsPerLine(parseInt(newValue));
					}),
			)
			.setDisabled(!this.isSettingEnabled());
	}

	override load() {
		this.plugin.setCSSVariable(
			"--max-chars-per-line",
			`${this.plugin.settings.maxCharsPerLine}ch`,
		);
	}

	private changeMaxCharsPerLine(newValue: number) {
		this.plugin.settings.maxCharsPerLine = newValue;
		this.plugin.setCSSVariable("--max-chars-per-line", `${newValue}ch`);
		this.plugin.saveSettings();
	}

	protected override isSettingEnabled(): boolean {
		return this.plugin.settings.isMaxCharsPerLineEnabled;
	}
}
