import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { Feature } from "@/features/base/Feature";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

export default class DimUnfocusedEditorsBehavior extends Feature {
	protected setting: keyof TypewriterModeSettings =
		"dimUnfocusedEditorsBehavior";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Paragraph dimming behavior in unfocused notes")
			.setDesc(
				"How to dim paragraphs in notes / editors that your cursor is not on (e.g. if you have multiple notes open in split panes)",
			)
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("dim-none", "Do not dim any paragraph")
					.addOption("dim", "Dim all but the previously focused paragraph")
					.addOption("dim-all", "Dim all paragraphs")
					.setValue(this.plugin.settings.dimUnfocusedEditorsBehavior)
					.onChange((newValue) => {
						this.changeDimUnfocusedEditorsBehavior(
							newValue as "dim-none" | "dim" | "dim-all",
						);
						settingTab.display();
					}),
			)
			.setDisabled(!this.isSettingEnabled());
	}

	override load() {
		super.load();
		this.plugin.perWindowProps.bodyAttrs[
			"data-ptm-dim-unfocused-editors-behavior"
		] = this.plugin.settings.dimUnfocusedEditorsBehavior;
	}

	private changeDimUnfocusedEditorsBehavior(
		newValue: "dim-none" | "dim" | "dim-all",
	) {
		this.plugin.settings.dimUnfocusedEditorsBehavior = newValue;
		this.plugin.perWindowProps.bodyAttrs[
			"data-ptm-dim-unfocused-editors-behavior"
		] = newValue;
		this.plugin.saveSettings().then();
	}

	protected override isSettingEnabled(): boolean {
		return (
			super.isSettingEnabled() &&
			this.plugin.settings.isDimUnfocusedParagraphsEnabled
		);
	}
}
