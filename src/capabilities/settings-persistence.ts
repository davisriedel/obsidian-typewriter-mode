import type { TypewriterModeSettings } from "./settings";

type SettingsRecord = Record<string, unknown>;

const SETTINGS_CATEGORIES = [
  "currentLine",
  "dimming",
  "general",
  "hemingwayMode",
  "keepLinesAboveAndBelow",
  "maxChars",
  "restoreCursorPosition",
  "typewriter",
  "writingFocus",
] as const;

function cloneForPersistence<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isRecord(value: unknown): value is SettingsRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function mergeCursorPositions(
  rawData: unknown,
  cursorPositions: Record<string, unknown>
): TypewriterModeSettings | null {
  if (
    !(
      isRecord(rawData) &&
      SETTINGS_CATEGORIES.every((category) => isRecord(rawData[category]))
    )
  ) {
    return null;
  }

  return {
    ...rawData,
    restoreCursorPosition: {
      ...(rawData.restoreCursorPosition as SettingsRecord),
      cursorPositions: cloneForPersistence(cursorPositions),
    },
  } as unknown as TypewriterModeSettings;
}

export default class SettingsPersistence {
  private readonly loadData: () => Promise<unknown>;
  private readonly saveData: (
    settings: TypewriterModeSettings
  ) => Promise<void>;
  private saveQueue: Promise<void> = Promise.resolve();

  constructor(
    loadData: () => Promise<unknown>,
    saveData: (settings: TypewriterModeSettings) => Promise<void>
  ) {
    this.loadData = loadData;
    this.saveData = saveData;
  }

  save(settings: TypewriterModeSettings): Promise<void> {
    const snapshot = cloneForPersistence(settings);
    return this.enqueue(async () => {
      await this.saveData(snapshot);
    });
  }

  saveCursorPositions(
    cursorPositions: Record<string, unknown>
  ): Promise<boolean> {
    const snapshot = cloneForPersistence(cursorPositions);
    return this.enqueue(async () => {
      // Cursor state changes frequently and may be synced while Obsidian is
      // running. Preserve the current on-disk configuration instead of
      // replacing it with the potentially stale in-memory settings object.
      const settings = mergeCursorPositions(await this.loadData(), snapshot);
      if (!settings) {
        return false;
      }

      await this.saveData(settings);
      return true;
    });
  }

  private enqueue<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.saveQueue.then(operation);
    this.saveQueue = result.then(
      () => undefined,
      () => undefined
    );
    return result;
  }
}
