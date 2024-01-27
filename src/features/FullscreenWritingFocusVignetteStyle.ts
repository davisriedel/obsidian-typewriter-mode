import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class FullscreenWritingFocusVignetteStyle extends Feature {
	protected setting: keyof TypewriterModeSettings =
		"fullscreenWritingFocusVignetteStyle";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Fullscreen writing focus vignette style")
			.setDesc("The style of the vignette in fullscreen writing focus mode")
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("box", "Box")
					.addOption("column", "Column")
					.setValue(this.plugin.settings.fullscreenWritingFocusVignetteStyle)
					.onChange((newValue) => {
						this.changeVignetteStyle(newValue as "box" | "column");
						settingTab.display();
					}),
			)
			.setDisabled(!this.isSettingEnabled());
	}

	private changeVignetteStyle(newValue: "box" | "column") {
		this.plugin.settings.fullscreenWritingFocusVignetteStyle = newValue;
		this.plugin.saveSettings().then();
	}

	protected override isSettingEnabled(): boolean {
		return (
			super.isSettingEnabled() &&
			this.plugin.settings.doesFullscreenWritingFocusShowVignette
		);
	}
}
