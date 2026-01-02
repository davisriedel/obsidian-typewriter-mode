// ADAPTED FROM https://github.com/dy-sh/obsidian-remember-cursor-position/blob/master/main.ts

import type { SelectionRange } from "@codemirror/state";
import type { TAbstractFile } from "obsidian";
import { FeatureToggle } from "@/capabilities/base/feature-toggle";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

export default class RestoreCursorPosition extends FeatureToggle {
  settingKey: keyof LegacyTypewriterModeSettings =
    "isRestoreCursorPositionEnabled";
  protected settingTitle = "Restore cursor position";
  protected settingDesc = "Restore the last cursor position when opening files";

  get state(): Record<string, SelectionRange> {
    return this.tm.settings.restoreCursorPosition.cursorPositions as Record<
      string,
      SelectionRange
    >;
  }

  set state(value: Record<string, SelectionRange>) {
    this.tm.settings.restoreCursorPosition.cursorPositions = value;
  }

  override enable(): void {
    super.enable();

    this.tm.plugin.registerEvent(
      this.tm.plugin.app.workspace.on("quit", this.saveState)
    );

    this.tm.plugin.registerEvent(
      this.tm.plugin.app.vault.on("rename", this.onRenameFile)
    );

    this.tm.plugin.registerEvent(
      this.tm.plugin.app.vault.on("delete", this.onDeleteFile)
    );
  }

  override disable(): void {
    this.saveState();
    this.tm.plugin.app.workspace.off("quit", this.saveState);
    // @ts-expect-error
    this.tm.plugin.app.workspace.off("rename", this.onRenameFile);
    // @ts-expect-error
    this.tm.plugin.app.workspace.off("delete", this.onDeleteFile);
  }

  async saveState() {
    console.debug("Save cursor state");
    await this.tm.saveSettings();
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

  setCursorState(st: SelectionRange) {
    const fileName = this.tm.plugin.app.workspace.getActiveFile()?.path;
    if (!fileName) {
      return;
    }
    this.state[fileName] = st;
    console.debug("setCursorState", fileName, st);
  }
}
