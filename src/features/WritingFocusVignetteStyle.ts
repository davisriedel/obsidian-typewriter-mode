import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class WritingFocusVignetteStyle extends Feature {
	protected setting: keyof TypewriterModeSettings = "writingFocusVignetteStyle";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Writing focus vignette style")
			.setDesc("The style of the vignette in writing focus mode")
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("box", "Box")
					.addOption("column", "Column")
					.setValue(this.plugin.settings.writingFocusVignetteStyle)
					.onChange((newValue) => {
						this.changeVignetteStyle(newValue as "box" | "column");
						settingTab.display();
					}),
			);
	}

	private changeVignetteStyle(newValue: "box" | "column") {
		this.plugin.settings.writingFocusVignetteStyle = newValue;
		this.plugin.saveSettings().then();
	}
}
