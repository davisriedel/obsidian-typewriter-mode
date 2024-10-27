import type { PerWindowProps } from "@/cm6/facets/perWindowProps";
import { perWindowProps } from "@/cm6/facets/perWindowProps";
import { pluginSettingsFacet } from "@/cm6/facets/pluginSettingsFacet";
import createTypewriterModeViewPlugin from "@/cm6/plugin";
import TypewriterModeSettingTab from "@/components/SettingsTab";
import type { Extension } from "@codemirror/state";
import type { Plugin } from "obsidian";
import { FeatureToggle } from "./capabilities/base/FeatureToggle";
import { getCommands } from "./capabilities/commands";
import { getFeatures } from "./capabilities/features";
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

	readonly features = getFeatures(this);

	readonly commands = getCommands(this);

	constructor(
		plugin: Plugin,
		loadData: () => Promise<TypewriterModeSettings>,
		saveData: (settings: TypewriterModeSettings) => Promise<void>,
	) {
		this.plugin = plugin;
		this.loadData = loadData;
		this.saveData = saveData;
		this.editorExtensions = [
			createTypewriterModeViewPlugin(this.plugin.app),
			[],
		];
	}

	public async load() {
		await this.loadSettings();
		await this.saveSettings(); // if default settings were loaded

		this.loadPerWindowProps();
		this.loadEditorExtension();
	}

	public loadPerWindowProps() {
		this.perWindowProps.allBodyClasses = [];
		for (const category of Object.values(this.features)) {
			for (const feature of Object.values(category)) {
				feature.load();
				if (feature instanceof FeatureToggle) {
					const toggleClass = feature.getToggleClass();
					if (toggleClass) {
						this.perWindowProps.allBodyClasses.push(toggleClass);
					}
				}
			}
		}
		for (const command of Object.values(this.commands)) command.load();
		this.updateFacets();
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

	private updateFacets() {
		this.editorExtensions[1] = [
			pluginSettingsFacet.of(this.settings),
			perWindowProps.of(this.perWindowProps),
		];
	}

	public async loadSettings() {
		const settingsData = await this.loadData();
		this.settings = Object.assign(DEFAULT_SETTINGS, settingsData);
	}

	public async saveSettings() {
		await this.saveData(this.settings);
		this.updateFacets();
		this.plugin.app.workspace.updateOptions();
	}

	public setCSSVariable(property: string, value: string) {
		this.perWindowProps.cssVariables[property] = value;
	}
}
