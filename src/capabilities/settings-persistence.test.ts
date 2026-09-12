import { describe, expect, test } from "bun:test";
import { DEFAULT_SETTINGS, type TypewriterModeSettings } from "./settings";
import SettingsPersistence, {
  mergeCursorPositions,
} from "./settings-persistence";

function settingsWithVersion(version: string): TypewriterModeSettings {
  return {
    ...structuredClone(DEFAULT_SETTINGS),
    general: {
      ...DEFAULT_SETTINGS.general,
      version,
    },
  };
}

describe("mergeCursorPositions", () => {
  test("preserves the latest settings while replacing only cursor positions", () => {
    const onDisk = settingsWithVersion("synced-version");
    onDisk.typewriter.typewriterOffset = 0.75;

    const merged = mergeCursorPositions(onDisk, {
      "note.md": { anchor: 12, head: 12 },
    });

    expect(merged?.general.version).toBe("synced-version");
    expect(merged?.typewriter.typewriterOffset).toBe(0.75);
    expect(merged?.restoreCursorPosition.cursorPositions).toEqual({
      "note.md": { anchor: 12, head: 12 },
    });
  });

  test("refuses to overwrite missing or incomplete settings", () => {
    expect(mergeCursorPositions(null, {})).toBeNull();
    expect(mergeCursorPositions({}, {})).toBeNull();
    expect(mergeCursorPositions({ general: {} }, {})).toBeNull();
  });
});

describe("SettingsPersistence", () => {
  test("serializes settings and cursor writes", async () => {
    let onDisk = settingsWithVersion("old");
    let releaseFirstSave: (() => void) | undefined;
    const firstSaveBlocked = new Promise<void>((resolve) => {
      releaseFirstSave = resolve;
    });
    const writes: TypewriterModeSettings[] = [];

    const persistence = new SettingsPersistence(
      async () => structuredClone(onDisk),
      async (settings) => {
        if (writes.length === 0) {
          await firstSaveBlocked;
        }
        onDisk = structuredClone(settings);
        writes.push(onDisk);
      }
    );

    const changedSettings = settingsWithVersion("new");
    const settingsSave = persistence.save(changedSettings);
    const cursorSave = persistence.saveCursorPositions({
      "note.md": { anchor: 3, head: 3 },
    });

    await Promise.resolve();
    expect(writes).toHaveLength(0);
    releaseFirstSave?.();

    await Promise.all([settingsSave, cursorSave]);
    expect(writes).toHaveLength(2);
    expect(writes[1]?.general.version).toBe("new");
    expect(writes[1]?.restoreCursorPosition.cursorPositions).toEqual({
      "note.md": { anchor: 3, head: 3 },
    });
  });

  test("does not write cursor state over invalid data", async () => {
    let writeCount = 0;
    const persistence = new SettingsPersistence(
      async () => null,
      () => {
        writeCount += 1;
        return Promise.resolve();
      }
    );

    expect(await persistence.saveCursorPositions({})).toBe(false);
    expect(writeCount).toBe(0);
  });
});
