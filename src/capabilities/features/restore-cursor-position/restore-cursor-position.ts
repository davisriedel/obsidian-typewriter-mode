// ADAPTED FROM https://github.com/dy-sh/obsidian-remember-cursor-position/blob/master/main.ts

import type { SelectionRange } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import type { TAbstractFile, TFile } from "obsidian";
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

    this.tm.plugin.registerEvent(
      this.tm.plugin.app.workspace.on("file-open", this.onFileOpen)
    );
  }

  override disable(): void {
    this.saveState();
    this.tm.plugin.app.workspace.off("quit", this.saveState);
    // @ts-expect-error
    this.tm.plugin.app.workspace.off("rename", this.onRenameFile);
    // @ts-expect-error
    this.tm.plugin.app.workspace.off("delete", this.onDeleteFile);
    // @ts-expect-error
    this.tm.plugin.app.workspace.off("file-open", this.onFileOpen);
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

  private onFileOpen = (file: TFile | null): void => {
    if (!file) {
      return;
    }

    // Check if we have a saved cursor position for this file
    const savedPosition = this.state[file.path];
    if (!savedPosition) {
      return;
    }

    // Trigger restoration - use requestAnimationFrame to ensure DOM is ready
    window.requestAnimationFrame(() => {
      this.restoreSavedPosition(file.path);
    });
  };

  private restoreSavedPosition(filePath: string): void {
    // Get all active markdown views
    const leaves = this.tm.plugin.app.workspace.getLeavesOfType("markdown");

    for (const leaf of leaves) {
      const view = leaf.view;
      if (view.getViewType() === "markdown") {
        // Access the editor (CM6 EditorView)
        const editor = (view as unknown as { editor?: { cm?: EditorView } })
          .editor;
        if (!editor?.cm) {
          continue;
        }

        const cm = editor.cm;
        const currentFile = this.tm.plugin.app.workspace.getActiveFile();

        // Only restore if this view is showing the file we just opened
        if (currentFile?.path === filePath) {
          const savedState = this.state[filePath];

          // Check for flashing span (link anchor highlighting)
          const containsFlashingSpan =
            this.tm.plugin.app.workspace.containerEl.querySelector(
              "span.is-flashing"
            );

          if (!containsFlashingSpan && savedState) {
            console.debug(
              "Restore cursor position on file-open",
              filePath,
              savedState
            );
            cm.dispatch({ selection: savedState });
          }
        }
      }
    }
  }
}
