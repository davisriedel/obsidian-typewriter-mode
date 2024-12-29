import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class CurrentLineHighlightStyle extends Feature {
	public settingKey: keyof TypewriterModeSettings = "currentLineHighlightStyle";

	public override getBodyClasses(): string[] {
		return [
			"ptm-current-line-highlight-box",
			"ptm-current-line-highlight-underline",
		];
	}

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Current line highlight style")
			.setDesc("The style of the current line highlight")
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("box", "Box")
					.addOption("underline", "Underline")
					.setValue(this.tm.settings.currentLineHighlightStyle)
					.onChange((newValue) => {
						this.changeCurrentLineHighlightStyle(
							newValue as "box" | "underline",
						);
						settingTab.display();
					}),
			);
	}

	override load() {
		super.load();
		this.applyClass();
	}

	private applyClass() {
		const currentLineStyleClass = `ptm-current-line-highlight-${this.tm.settings.currentLineHighlightStyle}`;
		console.debug("apply current line style ", currentLineStyleClass);
		for (const cl of this.getBodyClasses())
			this.tm.perWindowProps.bodyClasses.remove(cl);
		this.tm.perWindowProps.bodyClasses.push(currentLineStyleClass);
		console.debug(this.tm.perWindowProps.bodyClasses);
	}

	private changeCurrentLineHighlightStyle(newValue: "box" | "underline") {
		console.debug("current line style", newValue);
		this.tm.settings.currentLineHighlightStyle = newValue;
		this.applyClass();
		this.tm.saveSettings().then();
	}
}
