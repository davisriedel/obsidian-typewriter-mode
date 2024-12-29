import type { PerWindowProps } from "@/cm6/perWindowProps";
import createTypewriterModeViewPlugin from "@/cm6/plugin";
import TypewriterModeSettingTab from "@/components/SettingsTab";
import type { Extension } from "@codemirror/state";
import type { Plugin } from "obsidian";
import type { Command } from "./capabilities/base/Command";
import type { Feature } from "./capabilities/base/Feature";
import { getCommands } from "./capabilities/commands";
import { getFeatures } from "./capabilities/features";
import type RestoreCursorPosition from "./capabilities/features/restoreCursorPosition/RestoreCursorPosition";
import {
	DEFAULT_SETTINGS,
	type TypewriterModeSettings,
} from "./capabilities/settings";

export default class TypewriterModeLib {
	public readonly plugin: Plugin;
	private readonly loadData: () => Promise<TypewriterModeSettings>;
	private readonly saveData: (
		settings: TypewriterModeSettings,
	) => Promise<void>;

	public settings: TypewriterModeSettings = DEFAULT_SETTINGS;

	public perWindowProps: PerWindowProps = {
		cssVariables: {},
		bodyClasses: [],
		bodyAttrs: {},
		allBodyClasses: [],
		persistentBodyClasses: [],
	};

	private editorExtensions: Extension[];

	readonly features: Record<
		string,
		Record<keyof TypewriterModeSettings, Feature>
	>;
	readonly commands: Record<string, Command>;

	constructor(
		plugin: Plugin,
		loadData: () => Promise<TypewriterModeSettings>,
		saveData: (settings: TypewriterModeSettings) => Promise<void>,
	) {
		this.plugin = plugin;
		this.loadData = loadData;
		this.saveData = saveData;

		// Features must be loaded first!
		this.features = getFeatures(this);
		this.commands = getCommands(this);

		this.editorExtensions = [createTypewriterModeViewPlugin(this), []];
	}

	public async load() {
		await this.loadSettings();
		await this.saveSettings(); // if default settings were loaded

		this.loadPerWindowProps();
		this.loadEditorExtension();
	}

	public loadPerWindowProps() {
		let allBodyClasses: string[] = [];
		for (const category of Object.values(this.features)) {
			for (const feature of Object.values(category)) {
				feature.load();
				console.debug(feature.settingKey, feature.getBodyClasses());
				allBodyClasses = allBodyClasses.concat(feature.getBodyClasses());
			}
		}
		console.debug("allBodyClasses", allBodyClasses);
		this.perWindowProps.allBodyClasses = allBodyClasses;
		for (const command of Object.values(this.commands)) command.load();
	}

	public getRestoreCursorPositionFeature(): RestoreCursorPosition {
		return this.features.restoreCursorPosition
			.isRestoreCursorPositionEnabled as RestoreCursorPosition;
	}

	public loadEditorExtension() {
		this.plugin.registerEditorExtension(this.editorExtensions);
	}

	public loadSettingsTab() {
		this.plugin.addSettingTab(
			new TypewriterModeSettingTab(this.plugin.app, this),
		);
	}

	public unload() {
		for (const category of Object.values(this.features)) {
			for (const feature of Object.values(category)) {
				feature.disable();
			}
		}
	}

	public async loadSettings() {
		const settingsData = await this.loadData();
		this.settings = Object.assign(DEFAULT_SETTINGS, settingsData);
	}

	public async saveSettings() {
		await this.saveData(this.settings);
		this.plugin.app.workspace.updateOptions();
	}

	public setCSSVariable(property: string, value: string) {
		this.perWindowProps.cssVariables[property] = value;
	}
}
