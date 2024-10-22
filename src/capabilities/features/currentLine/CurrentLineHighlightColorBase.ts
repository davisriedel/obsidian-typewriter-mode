import { Feature } from "@/capabilities/base/Feature";
import type TypewriterModeLib from "@/lib";
import type { PluginSettingTab } from "obsidian";
import { Setting } from "obsidian";

type ThemeMode = "light" | "dark";
type SettingKey<T extends ThemeMode> = `currentLineHighlightColor-${T}`;

export default abstract class CurrentLineHighlightColor extends Feature {
	protected setting: SettingKey<ThemeMode>;
	protected themeMode: ThemeMode;

	public constructor(tm: TypewriterModeLib, themeMode: ThemeMode) {
		super(tm);
		this.themeMode = themeMode;
		this.setting = `currentLineHighlightColor-${themeMode}`;
	}

	registerSetting(settingTab: PluginSettingTab): void {
		new Setting(settingTab.containerEl)
			.setName(`Current line highlight color in ${this.themeMode} themes`)
			.setDesc(
				`The color of the current line highlight in ${this.themeMode} themes`,
			)
			.setClass("typewriter-mode-setting")
			.addText((text) =>
				text
					.setValue(this.tm.settings[this.setting] as string)
					.onChange((newValue) => {
						this.changeCurrentLineHighlightColor(newValue);
					}),
			);
	}

	override load() {
		this.tm.setCSSVariable(
			`--current-line-highlight-color-${this.themeMode}`,
			`${this.tm.settings[this.setting]}`,
		);
	}

	private changeCurrentLineHighlightColor(newValue: string) {
		this.tm.settings[this.setting] = newValue;
		this.tm.setCSSVariable(
			`--current-line-highlight-color-${this.themeMode}`,
			`${newValue}`,
		);
		this.tm.saveSettings().then();
	}
}
