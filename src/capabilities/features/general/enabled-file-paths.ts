import type { App, SettingGroup } from "obsidian";
import { TFolder } from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import type { LegacyTypewriterModeSettings } from "@/capabilities/settings";

function getVaultPaths(app: App): string[] {
  const out = new Set<string>();
  for (const f of app.vault.getFiles()) {
    out.add(f.path);
  }
  function walk(folder: TFolder) {
    if (folder.path !== undefined) {
      out.add(folder.path);
    }
    for (const c of folder.children ?? []) {
      if (c instanceof TFolder) {
        walk(c);
      }
    }
  }
  const root = app.vault.getRoot();
  if (root instanceof TFolder) {
    walk(root);
  }
  return [...out].sort();
}

function displayPath(p: string): string {
  return p === "" ? "(Vault root)" : p;
}

export default class EnabledFilePaths extends Feature {
  settingKey: keyof LegacyTypewriterModeSettings = "enabledFilePaths";

  registerSetting(settingGroup: SettingGroup): void {
    const paths = [...((this.getSettingValue() as string[]) || [])];
    const vaultPaths = getVaultPaths(this.tm.plugin.app);

    let blurTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let addMessageTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let dropdownVisible = false;
    let justAddedFromDropdown = false;
    let filtered: string[] = [];
    let highlightedIndex = -1;

    const containerEl = document.createElement("div");
    containerEl.addClass("enabled-file-paths-container");

    const listContainer = document.createElement("div");
    listContainer.addClass("enabled-file-paths-list");

    const inputContainer = document.createElement("div");
    inputContainer.addClass("enabled-file-paths-input-container");
    inputContainer.style.display = "flex";
    inputContainer.style.flexDirection = "column";
    inputContainer.style.gap = "8px";
    inputContainer.style.marginTop = "8px";

    const inputRow = document.createElement("div");
    inputRow.style.display = "flex";
    inputRow.style.gap = "8px";
    inputRow.style.position = "relative";

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.placeholder = "Type to search vault paths…";
    textInput.addClass("enabled-file-paths-input");
    textInput.style.flex = "1";

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.addClass("mod-cta");

    const dropdownEl = document.createElement("div");
    dropdownEl.addClass("enabled-file-paths-dropdown");
    dropdownEl.style.position = "absolute";
    dropdownEl.style.top = "100%";
    dropdownEl.style.left = "0";
    dropdownEl.style.right = "0";
    dropdownEl.style.maxHeight = "200px";
    dropdownEl.style.overflowY = "auto";
    dropdownEl.style.zIndex = "100";
    dropdownEl.style.backgroundColor = "var(--background-primary)";
    dropdownEl.style.border = "1px solid var(--background-modifier-border)";
    dropdownEl.style.borderRadius = "4px";
    dropdownEl.style.marginTop = "2px";
    dropdownEl.hidden = true;

    const messageEl = document.createElement("div");
    messageEl.addClass("enabled-file-paths-message");
    messageEl.style.fontSize = "0.9em";
    messageEl.style.display = "none";

    const updatePatterns = (newPaths: string[]): void => {
      this.setSettingValue(newPaths as unknown as string | boolean | number);
      this.tm.saveSettings().catch((error) => {
        console.error("Failed to save settings:", error);
      });
    };

    const renderPatterns = (
      container: HTMLElement,
      pathList: string[]
    ): void => {
      container.empty();

      if (pathList.length === 0) {
        const emptyMsg = document.createElement("div");
        emptyMsg.textContent =
          "No paths defined. Plugin will work on all files.";
        emptyMsg.style.color = "var(--text-muted)";
        emptyMsg.style.fontSize = "0.9em";
        emptyMsg.style.marginBottom = "8px";
        container.appendChild(emptyMsg);
        return;
      }

      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i];
        const item = document.createElement("div");
        item.style.display = "flex";
        item.style.alignItems = "center";
        item.style.gap = "8px";
        item.style.marginBottom = "4px";
        item.style.padding = "4px 8px";
        item.style.backgroundColor = "var(--background-secondary)";
        item.style.borderRadius = "4px";

        const pathText = document.createElement("code");
        pathText.textContent = displayPath(path);
        pathText.style.flex = "1";
        pathText.style.fontSize = "0.9em";
        pathText.style.overflow = "hidden";
        pathText.style.textOverflow = "ellipsis";
        pathText.style.whiteSpace = "nowrap";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addClass("mod-small");
        removeBtn.onclick = () => {
          const current = [...((this.getSettingValue() as string[]) || [])];
          const next = current.filter((_, idx) => idx !== i);
          updatePatterns(next);
          renderPatterns(container, next);
        };

        item.appendChild(pathText);
        item.appendChild(removeBtn);
        container.appendChild(item);
      }
    };

    const renderDropdown = (): void => {
      if (!dropdownVisible) {
        dropdownEl.hidden = true;
        return;
      }
      dropdownEl.hidden = false;
      dropdownEl.empty();

      for (let i = 0; i < filtered.length; i++) {
        const path = filtered[i];
        const item = document.createElement("div");
        item.addClass("enabled-file-paths-dropdown-item");
        item.textContent = displayPath(path);
        item.style.padding = "4px 8px";
        item.style.cursor = "pointer";
        if (i === highlightedIndex) {
          item.style.backgroundColor = "var(--background-modifier-hover)";
        }
        item.addEventListener("mousedown", (e) => {
          e.preventDefault();
          justAddedFromDropdown = true;
          if (blurTimeoutId != null) {
            clearTimeout(blurTimeoutId);
          }
          blurTimeoutId = null;
          const current = [...((this.getSettingValue() as string[]) || [])];
          if (current.includes(path)) {
            return;
          }
          const next = [...current, path];
          updatePatterns(next);
          renderPatterns(listContainer, next);
          textInput.value = "";
          dropdownVisible = false;
          renderDropdown();
        });
        dropdownEl.appendChild(item);
      }

      if (
        highlightedIndex >= 0 &&
        highlightedIndex < dropdownEl.children.length
      ) {
        dropdownEl.children[highlightedIndex].scrollIntoView({
          block: "nearest",
        });
      }
    };

    const hideDropdown = (): void => {
      dropdownVisible = false;
      renderDropdown();
    };

    const updateDropdown = (): void => {
      const q = textInput.value.trim().toLowerCase();
      filtered =
        q === ""
          ? vaultPaths.slice(0, 20)
          : vaultPaths.filter((p) => p.toLowerCase().includes(q)).slice(0, 20);
      highlightedIndex = filtered.length > 0 ? 0 : -1;
      dropdownVisible = true;
      renderDropdown();
    };

    textInput.addEventListener("focus", () => {
      if (blurTimeoutId != null) {
        clearTimeout(blurTimeoutId);
      }
      blurTimeoutId = null;
      updateDropdown();
    });

    textInput.addEventListener("blur", () => {
      if (justAddedFromDropdown) {
        justAddedFromDropdown = false;
        return;
      }
      if (blurTimeoutId != null) {
        clearTimeout(blurTimeoutId);
      }
      blurTimeoutId = setTimeout(() => {
        hideDropdown();
        blurTimeoutId = null;
      }, 150);
    });

    textInput.addEventListener("input", () => {
      updateDropdown();
    });

    textInput.addEventListener("keydown", (e) => {
      if (!dropdownVisible) {
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        highlightedIndex = Math.min(highlightedIndex + 1, filtered.length - 1);
        renderDropdown();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        highlightedIndex = Math.max(highlightedIndex - 1, 0);
        renderDropdown();
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const path = filtered[highlightedIndex] ?? filtered[0];
        if (path !== undefined) {
          const current = [...((this.getSettingValue() as string[]) || [])];
          if (!current.includes(path)) {
            const next = [...current, path];
            updatePatterns(next);
            renderPatterns(listContainer, next);
          }
          textInput.value = "";
          if (blurTimeoutId != null) {
            clearTimeout(blurTimeoutId);
          }
          blurTimeoutId = null;
          hideDropdown();
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        hideDropdown();
      }
    });

    addButton.onclick = () => {
      const trimmed = textInput.value.trim();
      if (!trimmed) {
        return;
      }
      if (blurTimeoutId != null) {
        clearTimeout(blurTimeoutId);
      }
      blurTimeoutId = null;
      if (addMessageTimeoutId != null) {
        clearTimeout(addMessageTimeoutId);
      }
      addMessageTimeoutId = null;
      messageEl.textContent = "";
      messageEl.style.display = "none";

      if (!vaultPaths.includes(trimmed)) {
        messageEl.textContent = "Path not found in vault.";
        messageEl.style.color = "var(--text-error)";
        messageEl.style.display = "block";
        addMessageTimeoutId = setTimeout(() => {
          messageEl.textContent = "";
          messageEl.style.display = "none";
          addMessageTimeoutId = null;
        }, 3000);
        return;
      }

      const current = [...((this.getSettingValue() as string[]) || [])];
      if (current.includes(trimmed)) {
        return;
      }
      const next = [...current, trimmed];
      updatePatterns(next);
      renderPatterns(listContainer, next);
      textInput.value = "";
      hideDropdown();
    };

    inputRow.appendChild(textInput);
    inputRow.appendChild(addButton);
    inputRow.appendChild(dropdownEl);
    inputContainer.appendChild(inputRow);
    inputContainer.appendChild(messageEl);

    containerEl.appendChild(listContainer);
    containerEl.appendChild(inputContainer);

    settingGroup.addSetting((setting) =>
      setting
        .setName("Enabled file paths")
        .setDesc(
          "Only enable the plugin for these files or folders. Type to search; select to add. Manual enable/disable takes precedence."
        )
        .setClass("typewriter-mode-setting")
        .settingEl.appendChild(containerEl)
    );

    renderPatterns(listContainer, paths);
  }
}
