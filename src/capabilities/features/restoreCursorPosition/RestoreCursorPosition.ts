// ADAPTED FROM https://github.com/dy-sh/obsidian-remember-cursor-position/blob/master/main.ts

import { FeatureToggle } from "@/capabilities/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/capabilities/settings";
import type { SelectionRange } from "@codemirror/state";
import type { TAbstractFile } from "obsidian";

export default class RestoreCursorPosition extends FeatureToggle {
	public settingKey: keyof TypewriterModeSettings =
		"isRestoreCursorPositionEnabled";
	protected settingTitle = "Restore cursor position";
	protected settingDesc = "Restore the last cursor position when opening files";

	private stateFilePath =
		`${this.tm.plugin.manifest.dir}/cursor-positions.json`;
	public state: Record<string, SelectionRange> = {};

	override enable(): void {
		super.enable();

		this.loadState();

		this.tm.plugin.registerEvent(
			this.tm.plugin.app.workspace.on("quit", this.saveState),
		);

		this.tm.plugin.registerEvent(
			this.tm.plugin.app.vault.on("rename", this.onRenameFile),
		);

		this.tm.plugin.registerEvent(
			this.tm.plugin.app.vault.on("delete", this.onDeleteFile),
		);
	}

	override disable(): void {
		this.saveState();
		this.tm.plugin.app.workspace.off("quit", this.saveState);
		// @ts-ignore
		this.tm.plugin.app.workspace.off("rename", this.onRenameFile);
		// @ts-ignore
		this.tm.plugin.app.workspace.off("delete", this.onDeleteFile);
	}

	private async loadState() {
		if (await this.tm.plugin.app.vault.adapter.exists(this.stateFilePath)) {
			const data = await this.tm.plugin.app.vault.adapter.read(
				this.stateFilePath,
			);
			this.state = JSON.parse(data);
			console.debug("Cursor state loaded", this.state);
		}
	}

	public async saveState() {
		console.debug("Save cursor state");
		await this.tm.plugin.app.vault.adapter.write(
			this.stateFilePath,
			JSON.stringify(this.state),
		);
	}

	private onRenameFile(file: TAbstractFile, oldPath: string) {
		const newName = file.path;
		const oldName = oldPath;
		this.state[newName] = this.state[oldName];
		delete this.state[oldName];
	}

	private onDeleteFile(file: TAbstractFile) {
		const fileName = file.path;
		delete this.state[fileName];
	}

	public async setCursorState(st: SelectionRange) {
		const fileName = this.tm.plugin.app.workspace.getActiveFile()?.path;
		if (!fileName) return;
		this.state[fileName] = st;
		console.debug("setCursorState", fileName, st);
	}
}
