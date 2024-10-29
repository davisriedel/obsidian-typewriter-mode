import { Feature } from "@/capabilities/base/Feature";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

type Options = "paragraphs" | "sentences";

export default class DimUnfocusedMode extends Feature {
	public settingKey: keyof TypewriterModeSettings = "dimUnfocusedMode";

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName("Dim unfocused mode")
			.setDesc("Choose to dim unfocused paragraphs or sentences")
			.setClass("typewriter-mode-setting")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("paragraphs", "Paragraphs")
					.addOption("sentences", "Sentences")
					.setValue(this.tm.settings.dimUnfocusedMode)
					.onChange((newValue) => {
						this.change(newValue as Options);
						settingTab.display();
					}),
			);
	}

	override load() {
		super.load();
		this.tm.perWindowProps.bodyAttrs["data-ptm-dim-unfocused-mode"] =
			this.tm.settings.dimUnfocusedMode;
	}

	private change(newValue: Options) {
		this.tm.settings.dimUnfocusedMode = newValue;
		this.tm.perWindowProps.bodyAttrs["data-ptm-dim-unfocused-mode"] =
			this.tm.settings.dimUnfocusedMode;
		this.tm.saveSettings().then();
	}
}
