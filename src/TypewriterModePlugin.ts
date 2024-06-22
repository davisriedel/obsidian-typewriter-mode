import type { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { DEFAULT_SETTINGS } from "@/TypewriterModeSettings";
import TypewriterModeSettingTab from "@/TypewriterModeSettingsTab";
import CodeMirrorPlugin from "@/cm-plugin/CMTypewriterModePlugin";
import type { PerWindowProps } from "@/cm-plugin/PerWindowProps";
import { perWindowProps } from "@/cm-plugin/PerWindowProps";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import type { Extension } from "@codemirror/state";
import { Plugin } from "obsidian";
import { UpdateModal } from "./UpdateModal";
import { FeatureToggle } from "./features/base/FeatureToggle";
import { getCommands } from "./features/commands";
import { getFeatures } from "./features/features";

export default class TypewriterModePlugin extends Plugin {
	settings: TypewriterModeSettings;

	perWindowProps: PerWindowProps = {
		cssVariables: {},
		bodyClasses: [],
		bodyAttrs: {},
		allBodyClasses: [],
	};

	private editorExtensions: Extension[] = [CodeMirrorPlugin, []];

	readonly features = getFeatures(this);

	readonly commands = getCommands(this);

	override async onload() {
		const settingsData = await this.loadData();
		this.settings = Object.assign(DEFAULT_SETTINGS, settingsData);
		this.perWindowProps.allBodyClasses = [];
		for (const feature of Object.values(this.features)) {
			feature.load();
			if (feature instanceof FeatureToggle) {
				const toggleClass = feature.getToggleClass();
				if (toggleClass) this.perWindowProps.allBodyClasses.push(toggleClass);
			}
		}
		for (const command of Object.values(this.commands)) command.load();
		this.addSettingTab(new TypewriterModeSettingTab(this.app, this));
		this.updateFacets();
		this.registerEditorExtension(this.editorExtensions);
		this.announceUpdate();
	}

	override onunload() {
		for (const feature of Object.values(this.features)) feature.disable();
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
		const knownVersion = this.settings.version;

		if (currentVersion === knownVersion) return;

		this.settings.version = currentVersion;
		this.saveSettings().then();

		if (this.settings.isAnnounceUpdatesEnabled === false) return;

		const updateModal = new UpdateModal(knownVersion);
		updateModal.open();
	}
}
