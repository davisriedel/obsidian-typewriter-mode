import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class WritingFocusVignetteStyle extends Feature {
	public settingKey: keyof TypewriterModeSettings = "writingFocusVignetteStyle";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Writing focus vignette style")
			.setDesc("The style of the vignette in writing focus mode")
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("box", "Box")
					.addOption("column", "Column")
					.setValue(this.tm.settings.writingFocusVignetteStyle)
					.onChange((newValue) => {
						this.changeVignetteStyle(newValue as "box" | "column");
						settingTab.display();
					}),
			);
	}

	private changeVignetteStyle(newValue: "box" | "column") {
		this.tm.settings.writingFocusVignetteStyle = newValue;
		this.tm.saveSettings().then();
	}
}
