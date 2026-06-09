import type { App, SettingDefinition, SettingGroup } from "obsidian";
import { AbstractInputSuggest, Modal, TFolder } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import { setSettingByPath } from "@/capabilities/settings";

function getVaultPaths(app: App): string[] {
  const paths = new Set<string>();
  for (const f of app.vault.getFiles()) {
    paths.add(f.path);
  }
  function walk(folder: TFolder) {
    if (folder.path) {
      paths.add(folder.path);
    }
    for (const child of folder.children) {
      if (child instanceof TFolder) {
        walk(child);
      }
    }
  }
  walk(app.vault.getRoot());
  return [...paths].sort();
}

class VaultPathSuggest extends AbstractInputSuggest<string> {
  private readonly vaultPaths: string[];

  constructor(app: App, inputEl: HTMLInputElement, vaultPaths: string[]) {
    super(app, inputEl);
    this.vaultPaths = vaultPaths;
  }

  protected override getSuggestions(query: string): string[] {
    const lower = query.toLowerCase();
    return this.vaultPaths
      .filter((p) => p.toLowerCase().includes(lower))
      .slice(0, 20);
  }

  override renderSuggestion(path: string, el: HTMLElement): void {
    el.setText(path);
  }
}

class FilePathsModal extends Modal {
  private readonly vaultPaths: string[];
  private readonly getEnabledPaths: () => string[];
  private readonly setEnabledPaths: (paths: string[]) => void;
  private readonly getDisabledPaths: () => string[];
  private readonly setDisabledPaths: (paths: string[]) => void;

  constructor(
    app: App,
    vaultPaths: string[],
    getEnabledPaths: () => string[],
    setEnabledPaths: (paths: string[]) => void,
    getDisabledPaths: () => string[],
    setDisabledPaths: (paths: string[]) => void
  ) {
    super(app);
    this.vaultPaths = vaultPaths;
    this.getEnabledPaths = getEnabledPaths;
    this.setEnabledPaths = setEnabledPaths;
    this.getDisabledPaths = getDisabledPaths;
    this.setDisabledPaths = setDisabledPaths;
  }

  override onOpen() {
    const { contentEl, modalEl } = this;
    modalEl.addClass("typewriter-mode-file-paths-modal");
    this.setTitle("File paths");

    const columnsEl = contentEl.createDiv({
      cls: "typewriter-mode-file-paths-columns",
    });

    this.renderSection(
      columnsEl,
      "Enabled paths",
      "Only enable the plugin for these files or folders. If empty, the plugin is active in all files.",
      this.getEnabledPaths,
      this.setEnabledPaths
    );

    this.renderSection(
      columnsEl,
      "Disabled paths",
      "Always disable the plugin for these files or folders, overriding the enabled paths.",
      this.getDisabledPaths,
      this.setDisabledPaths
    );
  }

  override onClose() {
    this.contentEl.empty();
  }

  private renderSection(
    columnsEl: HTMLElement,
    title: string,
    description: string,
    getPaths: () => string[],
    setPaths: (paths: string[]) => void
  ) {
    const columnEl = columnsEl.createDiv({
      cls: "typewriter-mode-file-paths-column",
    });

    columnEl.createEl("h3", { text: title });
    columnEl.createEl("p", {
      text: description,
      cls: "setting-item-description",
    });

    const inputEl = columnEl.createEl("input", {
      type: "text",
      placeholder: "Type to search vault paths…",
      cls: "typewriter-mode-file-paths-input",
    });

    const listEl = columnEl.createDiv({
      cls: "typewriter-mode-file-paths-list",
    });

    const renderList = () => {
      listEl.empty();
      const paths = getPaths();
      if (paths.length === 0) {
        listEl.createEl("p", {
          text: "No paths configured.",
          cls: "setting-item-description",
        });
        return;
      }
      for (const [index, path] of paths.entries()) {
        const row = listEl.createDiv({ cls: "typewriter-mode-file-paths-row" });
        row.createEl("code", {
          text: path,
          cls: "typewriter-mode-file-paths-row-name",
        });
        const removeBtn = row.createEl("button", { text: "Remove" });
        removeBtn.addEventListener("click", () => {
          const updated = [...getPaths()];
          updated.splice(index, 1);
          setPaths(updated);
          renderList();
        });
      }
    };

    renderList();

    const suggest = new VaultPathSuggest(this.app, inputEl, this.vaultPaths);
    suggest.onSelect((path) => {
      const current = getPaths();
      if (!current.includes(path)) {
        setPaths([...current, path]);
        renderList();
      }
      suggest.setValue("");
    });
  }
}

export default class EnabledFilePaths extends Feature {
  readonly settingKey = "general.enabledFilePaths" as const;

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      name: "File paths",
      desc: "Configure which files or folders the plugin is enabled or disabled in.",
      render: (setting) => {
        setting.setClass("typewriter-mode-setting").addButton((button) =>
          button.setButtonText("Configure").onClick(() => {
            this.openModal();
            onChanged?.();
          })
        );
      },
    };
  }

  private openModal() {
    const app = this.tm.plugin.app;
    const vaultPaths = getVaultPaths(app);

    const getEnabled = () => this.tm.settings.general.enabledFilePaths ?? [];
    const setEnabled = (paths: string[]) => {
      this.setSettingValue(paths);
      this.tm.saveSettings().catch((error) => {
        console.error("Failed to save settings:", error);
      });
    };

    const getDisabled = () => this.tm.settings.general.disabledFilePaths ?? [];
    const setDisabled = (paths: string[]) => {
      setSettingByPath(this.tm.settings, "general.disabledFilePaths", paths);
      this.tm.saveSettings().catch((error) => {
        console.error("Failed to save settings:", error);
      });
    };

    new FilePathsModal(
      app,
      vaultPaths,
      getEnabled,
      setEnabled,
      getDisabled,
      setDisabled
    ).open();
  }

  registerSetting(settingGroup: SettingGroup): void {
    settingGroup.addSetting((setting) => {
      setting
        .setName("File paths")
        .setDesc(
          "Configure which files or folders the plugin is enabled or disabled in."
        )
        .setClass("typewriter-mode-setting")
        .addButton((button) =>
          button.setButtonText("Configure").onClick(() => {
            this.openModal();
          })
        );
    });
  }
}
