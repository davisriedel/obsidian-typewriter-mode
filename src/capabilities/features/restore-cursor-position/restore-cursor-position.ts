// ADAPTED FROM https://github.com/dy-sh/obsidian-remember-cursor-position/blob/master/main.ts

import type { SelectionRange } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import type { EventRef, TAbstractFile, TFile } from "obsidian";
import { FeatureToggle } from "@/capabilities/base/feature-toggle";

const CURSOR_SAVE_DEBOUNCE_MS = 1000;

export default class RestoreCursorPosition extends FeatureToggle {
  private isEnabled = false;
  private deleteEvent: EventRef | null = null;
  private fileOpenEvent: EventRef | null = null;
  private quitEvent: EventRef | null = null;
  private renameEvent: EventRef | null = null;
  private saveTimer: ReturnType<typeof setTimeout> | null = null;

  readonly settingKey =
    "restoreCursorPosition.isRestoreCursorPositionEnabled" as const;
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
    if (this.isEnabled) {
      return;
    }

    super.enable();
    this.isEnabled = true;

    this.quitEvent = this.tm.plugin.app.workspace.on("quit", this.saveState);
    this.renameEvent = this.tm.plugin.app.vault.on("rename", this.onRenameFile);
    this.deleteEvent = this.tm.plugin.app.vault.on("delete", this.onDeleteFile);
    this.fileOpenEvent = this.tm.plugin.app.workspace.on(
      "file-open",
      this.onFileOpen
    );

    this.tm.plugin.registerEvent(this.quitEvent);
    this.tm.plugin.registerEvent(this.renameEvent);
    this.tm.plugin.registerEvent(this.deleteEvent);
    this.tm.plugin.registerEvent(this.fileOpenEvent);
  }

  override disable(): void {
    if (!this.isEnabled) {
      return;
    }

    this.isEnabled = false;
    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }

    if (this.quitEvent) {
      this.tm.plugin.app.workspace.offref(this.quitEvent);
      this.quitEvent = null;
    }
    if (this.renameEvent) {
      this.tm.plugin.app.vault.offref(this.renameEvent);
      this.renameEvent = null;
    }
    if (this.deleteEvent) {
      this.tm.plugin.app.vault.offref(this.deleteEvent);
      this.deleteEvent = null;
    }
    if (this.fileOpenEvent) {
      this.tm.plugin.app.workspace.offref(this.fileOpenEvent);
      this.fileOpenEvent = null;
    }
    super.disable();
  }

  readonly saveState = async () => {
    if (!this.getSettingValue()) {
      return;
    }

    console.debug("Save cursor state");
    await this.tm.saveCursorPositions(this.state);
  };

  private readonly onRenameFile = (file: TAbstractFile, oldPath: string) => {
    const newName = file.path;
    const oldName = oldPath;
    this.state[newName] = this.state[oldName];
    delete this.state[oldName];
    this.scheduleSave();
  };

  private readonly onDeleteFile = (file: TAbstractFile) => {
    const fileName = file.path;
    delete this.state[fileName];
    this.scheduleSave();
  };

  setCursorState(st: SelectionRange) {
    const fileName = this.tm.plugin.app.workspace.getActiveFile()?.path;
    if (!fileName) {
      return;
    }
    this.state[fileName] = st;
    this.scheduleSave();
    console.debug("setCursorState", fileName, st);
  }

  private scheduleSave(): void {
    if (!this.isEnabled) {
      return;
    }

    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer);
    }
    this.saveTimer = setTimeout(() => {
      this.saveTimer = null;
      this.saveState().catch((error) => {
        console.error("Failed to save cursor state:", error);
      });
    }, CURSOR_SAVE_DEBOUNCE_MS);
  }

  private readonly onFileOpen = (file: TFile | null): void => {
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
