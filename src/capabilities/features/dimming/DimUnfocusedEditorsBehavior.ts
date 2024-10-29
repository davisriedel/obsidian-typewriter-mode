import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class DimUnfocusedEditorsBehavior extends Feature {
	public settingKey: keyof TypewriterModeSettings =
		"dimUnfocusedEditorsBehavior";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Dimming behavior in unfocused notes")
			.setDesc(
				"How to dim paragraphs / sentences in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)",
			)
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("dim-none", "Do not dim anything")
					.addOption(
						"dim",
						"Dim all but the previously focused paragraph / sentence",
					)
					.addOption("dim-all", "Dim everything")
					.setValue(this.tm.settings.dimUnfocusedEditorsBehavior)
					.onChange((newValue) => {
						this.changeDimUnfocusedEditorsBehavior(
							newValue as "dim-none" | "dim" | "dim-all",
						);
						settingTab.display();
					}),
			);
	}

	override load() {
		super.load();
		this.tm.perWindowProps.bodyAttrs[
			"data-ptm-dim-unfocused-editors-behavior"
		] = this.tm.settings.dimUnfocusedEditorsBehavior;
	}

	private changeDimUnfocusedEditorsBehavior(
		newValue: "dim-none" | "dim" | "dim-all",
	) {
		this.tm.settings.dimUnfocusedEditorsBehavior = newValue;
		this.tm.perWindowProps.bodyAttrs[
			"data-ptm-dim-unfocused-editors-behavior"
		] = newValue;
		this.tm.saveSettings().then();
	}
}
