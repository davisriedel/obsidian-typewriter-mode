import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class DimmedParagraphsOpacity extends Feature {
	protected setting: keyof TypewriterModeSettings = "dimmedParagraphsOpacity";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Opacity of dimmed paragraphs")
			.setDesc("The opacity of dimmed paragraphs")
			.setClass("typewriter-mode-setting")
			.addSlider((slider) =>
				slider
					.setLimits(0, 100, 5)
					.setDynamicTooltip()
					.setValue(this.plugin.settings.dimmedParagraphsOpacity * 100)
					.onChange((newValue) => {
						this.changeDimmedParagraphsOpacity(newValue / 100);
					}),
			)
			.setDisabled(!this.plugin.settings.isDimUnfocusedParagraphsEnabled);
	}

	override load() {
		this.plugin.setCSSVariable(
			"--dimmed-paragraphs-opacity",
			`${this.plugin.settings.dimmedParagraphsOpacity}`,
		);
	}

	private changeDimmedParagraphsOpacity(newValue = 0.25) {
		this.plugin.settings.dimmedParagraphsOpacity = newValue;
		this.plugin.setCSSVariable("--dimmed-paragraphs-opacity", `${newValue}`);
		this.plugin.saveSettings().then(() => {
			this.plugin.reloadCodeMirror();
		});
	}
}
