import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class CurrentLineHighlightStyle extends Feature {
	protected setting: keyof TypewriterModeSettings = "currentLineHighlightStyle";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Current line highlight style")
			.setDesc("The style of the current line highlight")
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("box", "Box")
					.addOption("underline", "Underline")
					.setValue(this.plugin.settings.currentLineHighlightStyle)
					.onChange((newValue) => {
						this.changeCurrentLineHighlightStyle(
							newValue as "box" | "underline",
						);
						settingTab.display();
					}),
			);
	}

	private changeCurrentLineHighlightStyle(newValue: "box" | "underline") {
		this.plugin.settings.currentLineHighlightStyle = newValue;
		this.plugin.saveSettings().then();
	}
}
