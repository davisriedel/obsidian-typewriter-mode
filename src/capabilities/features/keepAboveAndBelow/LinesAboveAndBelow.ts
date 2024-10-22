import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
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
					.setValue(this.tm.settings.linesAboveAndBelow.toString())
					.onChange((newValue) => {
						this.changeAmountOfLinesAboveAndBelow(Number.parseInt(newValue));
					}),
			);
	}

	private changeAmountOfLinesAboveAndBelow(newValue: number) {
		this.tm.settings.linesAboveAndBelow = newValue;
		this.tm.saveSettings().then();
	}
}
