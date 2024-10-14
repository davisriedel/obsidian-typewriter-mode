import type { PerWindowProps } from "@/cm6/facets/perWindowProps";
import { perWindowProps } from "@/cm6/facets/perWindowProps";
import { pluginSettingsFacet } from "@/cm6/facets/pluginSettingsFacet";
import createTypewriterModeViewPlugin from "@/cm6/plugin";
import TypewriterModeSettingTab from "@/components/SettingsTab";
import type { Extension } from "@codemirror/state";
import { Plugin } from "obsidian";
import { FeatureToggle } from "./capabilities/base/FeatureToggle";
import { getCommands } from "./capabilities/commands";
import { getFeatures } from "./capabilities/features";
import {
	DEFAULT_SETTINGS,
	type TypewriterModeSettings,
} from "./capabilities/settings";
import { UpdateModal } from "./components/UpdateModal";

export default class TypewriterModePlugin extends Plugin {
	settings: TypewriterModeSettings = DEFAULT_SETTINGS;

	perWindowProps: PerWindowProps = {
		cssVariables: {},
		bodyClasses: [],
		bodyAttrs: {},
		allBodyClasses: [],
		persistentBodyClasses: [],
	};

	private editorExtensions: Extension[] = [
		createTypewriterModeViewPlugin(this.app),
		[],
	];

	readonly features = getFeatures(this);

	readonly commands = getCommands(this);

	override async onload() {
		const settingsData = await this.loadData();
		this.settings = Object.assign(DEFAULT_SETTINGS, settingsData);
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
		this.addSettingTab(new TypewriterModeSettingTab(this.app, this));
		this.updateFacets();
		this.registerEditorExtension(this.editorExtensions);

		this.app.workspace.onLayoutReady(() => {
			this.announceUpdate();
		});
	}

	override onunload() {
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

	async saveSettings() {
		await this.saveData(this.settings);
		this.updateFacets();
		this.app.workspace.updateOptions();
	}

	setCSSVariable(property: string, value: string) {
		this.perWindowProps.cssVariables[property] = value;
	}

	private announceUpdate() {
		const currentVersion = this.manifest.version;
		const knownVersion = this.settings.version ?? "";

		if (currentVersion === knownVersion) return;

		this.settings.version = currentVersion;
		this.saveSettings().then();

		if (this.settings.isAnnounceUpdatesEnabled === false) return;

		const updateModal = new UpdateModal(this.app, currentVersion, knownVersion);
		updateModal.open();
	}
}
