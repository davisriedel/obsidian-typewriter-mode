import { type App, Plugin, type PluginManifest } from "obsidian";
import type { TypewriterModeSettings } from "./capabilities/settings";
import { UpdateModal } from "./components/UpdateModal";
import TypewriterModeLib from "./lib";

export default class TypewriterModePlugin extends Plugin {
	private readonly tm: TypewriterModeLib;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		this.tm = new TypewriterModeLib(
			this,
			async () => await this.loadData(),
			async (settings: TypewriterModeSettings) => await this.saveData(settings),
		);
	}

	override async onload() {
		await this.tm.load();

		this.tm.loadSettingsTab();

		// Load update announcer
		this.app.workspace.onLayoutReady(() => {
			this.announceUpdate();
		});
	}

	override onunload() {
		this.tm.unload();
	}

	private announceUpdate() {
		const currentVersion = this.manifest.version;
		const knownVersion = this.tm.settings.version ?? "";

		if (currentVersion === knownVersion) return;

		this.tm.settings.version = currentVersion;
		this.tm.saveSettings().then();

		if (this.tm.settings.isAnnounceUpdatesEnabled === false) return;

		const updateModal = new UpdateModal(this.app, currentVersion, knownVersion);
		updateModal.open();
	}
}
