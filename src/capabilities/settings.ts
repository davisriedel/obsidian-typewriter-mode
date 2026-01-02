import type {
  CurrentLineHighlightStyle,
  DimUnfocusedEditorsBehavior,
  DimUnfocusedMode,
  WritingFocusVignetteStyle,
} from "./constants";

export interface GeneralSettings {
  version: string | null;
  isAnnounceUpdatesEnabled: boolean;
  isPluginActivated: boolean;
  isOnlyActivateAfterFirstInteractionEnabled: boolean;
}

export interface TypewriterSettings {
  isTypewriterScrollEnabled: boolean;
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: boolean;
  isTypewriterOnlyUseCommandsEnabled: boolean;
  typewriterOffset: number;
}

export interface KeepLinesAboveAndBelowSettings {
  isKeepLinesAboveAndBelowEnabled: boolean;
  linesAboveAndBelow: number;
}

export interface MaxCharsSettings {
  isMaxCharsPerLineEnabled: boolean;
  maxCharsPerLine: number;
}

export interface DimmingSettings {
  isDimUnfocusedEnabled: boolean;
  isDimHighlightListParentEnabled: boolean;
  isDimTableAsOneEnabled: boolean;
  dimUnfocusedMode: DimUnfocusedMode;
  dimUnfocusedEditorsBehavior: DimUnfocusedEditorsBehavior;
  dimmedOpacity: number;
  isPauseDimUnfocusedWhileScrollingEnabled: boolean;
  isPauseDimUnfocusedWhileSelectingEnabled: boolean;
}

export interface CurrentLineSettings {
  isHighlightCurrentLineEnabled: boolean;
  isFadeLinesEnabled: boolean;
  fadeLinesIntensity: number;
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
  currentLineHighlightStyle: CurrentLineHighlightStyle;
  currentLineHighlightUnderlineThickness: number;
  "currentLineHighlightColor-dark": string;
  "currentLineHighlightColor-light": string;
}

export interface WritingFocusSettings {
  doesWritingFocusShowHeader: boolean;
  doesWritingFocusShowVignette: boolean;
  doesWritingFocusShowStatusBar: boolean;
  isWritingFocusFullscreen: boolean;
  writingFocusVignetteStyle: WritingFocusVignetteStyle;
}

export interface RestoreCursorPositionSettings {
  isRestoreCursorPositionEnabled: boolean;
  cursorPositions: Record<string, unknown>;
}

export interface TypewriterModeSettings {
  general: GeneralSettings;
  typewriter: TypewriterSettings;
  keepLinesAboveAndBelow: KeepLinesAboveAndBelowSettings;
  maxChars: MaxCharsSettings;
  dimming: DimmingSettings;
  currentLine: CurrentLineSettings;
  writingFocus: WritingFocusSettings;
  restoreCursorPosition: RestoreCursorPositionSettings;
}

// Legacy flat settings structure for migration
export interface LegacyTypewriterModeSettings {
  version: string | null;
  isAnnounceUpdatesEnabled: boolean;
  isPluginActivated: boolean;
  isTypewriterScrollEnabled: boolean;
  isOnlyActivateAfterFirstInteractionEnabled: boolean;
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: boolean;
  isTypewriterOnlyUseCommandsEnabled: boolean;
  typewriterOffset: number;
  isKeepLinesAboveAndBelowEnabled: boolean;
  linesAboveAndBelow: number;
  isMaxCharsPerLineEnabled: boolean;
  maxCharsPerLine: number;
  isDimUnfocusedEnabled: boolean;
  isDimHighlightListParentEnabled: boolean;
  isDimTableAsOneEnabled: boolean;
  dimUnfocusedMode: DimUnfocusedMode;
  dimUnfocusedEditorsBehavior: DimUnfocusedEditorsBehavior;
  dimmedOpacity: number;
  isPauseDimUnfocusedWhileScrollingEnabled: boolean;
  isPauseDimUnfocusedWhileSelectingEnabled: boolean;
  isHighlightCurrentLineEnabled: boolean;
  isFadeLinesEnabled: boolean;
  fadeLinesIntensity: number;
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
  currentLineHighlightStyle: CurrentLineHighlightStyle;
  currentLineHighlightUnderlineThickness: number;
  "currentLineHighlightColor-dark": string;
  "currentLineHighlightColor-light": string;
  doesWritingFocusShowHeader: boolean;
  doesWritingFocusShowVignette: boolean;
  doesWritingFocusShowStatusBar: boolean;
  isWritingFocusFullscreen: boolean;
  writingFocusVignetteStyle: WritingFocusVignetteStyle;
  isRestoreCursorPositionEnabled: boolean;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  general: {
    version: null,
    isAnnounceUpdatesEnabled: true,
    isPluginActivated: true,
    isOnlyActivateAfterFirstInteractionEnabled: false,
  },
  typewriter: {
    isTypewriterScrollEnabled: true,
    isOnlyMaintainTypewriterOffsetWhenReachedEnabled: false,
    isTypewriterOnlyUseCommandsEnabled: false,
    typewriterOffset: 0.5,
  },
  keepLinesAboveAndBelow: {
    isKeepLinesAboveAndBelowEnabled: false,
    linesAboveAndBelow: 5,
  },
  maxChars: {
    isMaxCharsPerLineEnabled: false,
    maxCharsPerLine: 64,
  },
  dimming: {
    isDimUnfocusedEnabled: false,
    isDimHighlightListParentEnabled: false,
    isDimTableAsOneEnabled: true,
    dimUnfocusedMode: "paragraphs",
    dimUnfocusedEditorsBehavior: "dim",
    dimmedOpacity: 0.25,
    isPauseDimUnfocusedWhileScrollingEnabled: true,
    isPauseDimUnfocusedWhileSelectingEnabled: true,
  },
  currentLine: {
    isHighlightCurrentLineEnabled: true,
    isFadeLinesEnabled: false,
    fadeLinesIntensity: 0.5,
    isHighlightCurrentLineOnlyInFocusedEditorEnabled: false,
    currentLineHighlightStyle: "box",
    currentLineHighlightUnderlineThickness: 1,
    "currentLineHighlightColor-dark": "#444",
    "currentLineHighlightColor-light": "#ddd",
  },
  writingFocus: {
    doesWritingFocusShowHeader: false,
    doesWritingFocusShowStatusBar: false,
    doesWritingFocusShowVignette: true,
    isWritingFocusFullscreen: true,
    writingFocusVignetteStyle: "box",
  },
  restoreCursorPosition: {
    isRestoreCursorPositionEnabled: false,
    cursorPositions: {},
  },
};

// Settings path mapping for compatibility
interface SettingsPath {
  category: keyof TypewriterModeSettings;
  key: string;
}

export const SETTINGS_PATHS: Record<
  keyof LegacyTypewriterModeSettings,
  SettingsPath
> = {
  version: { category: "general", key: "version" },
  isAnnounceUpdatesEnabled: {
    category: "general",
    key: "isAnnounceUpdatesEnabled",
  },
  isPluginActivated: { category: "general", key: "isPluginActivated" },
  isOnlyActivateAfterFirstInteractionEnabled: {
    category: "general",
    key: "isOnlyActivateAfterFirstInteractionEnabled",
  },
  isTypewriterScrollEnabled: {
    category: "typewriter",
    key: "isTypewriterScrollEnabled",
  },
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: {
    category: "typewriter",
    key: "isOnlyMaintainTypewriterOffsetWhenReachedEnabled",
  },
  isTypewriterOnlyUseCommandsEnabled: {
    category: "typewriter",
    key: "isTypewriterOnlyUseCommandsEnabled",
  },
  typewriterOffset: { category: "typewriter", key: "typewriterOffset" },
  isKeepLinesAboveAndBelowEnabled: {
    category: "keepLinesAboveAndBelow",
    key: "isKeepLinesAboveAndBelowEnabled",
  },
  linesAboveAndBelow: {
    category: "keepLinesAboveAndBelow",
    key: "linesAboveAndBelow",
  },
  isMaxCharsPerLineEnabled: {
    category: "maxChars",
    key: "isMaxCharsPerLineEnabled",
  },
  maxCharsPerLine: { category: "maxChars", key: "maxCharsPerLine" },
  isDimUnfocusedEnabled: { category: "dimming", key: "isDimUnfocusedEnabled" },
  isDimHighlightListParentEnabled: {
    category: "dimming",
    key: "isDimHighlightListParentEnabled",
  },
  isDimTableAsOneEnabled: {
    category: "dimming",
    key: "isDimTableAsOneEnabled",
  },
  dimUnfocusedMode: { category: "dimming", key: "dimUnfocusedMode" },
  dimUnfocusedEditorsBehavior: {
    category: "dimming",
    key: "dimUnfocusedEditorsBehavior",
  },
  dimmedOpacity: { category: "dimming", key: "dimmedOpacity" },
  isPauseDimUnfocusedWhileScrollingEnabled: {
    category: "dimming",
    key: "isPauseDimUnfocusedWhileScrollingEnabled",
  },
  isPauseDimUnfocusedWhileSelectingEnabled: {
    category: "dimming",
    key: "isPauseDimUnfocusedWhileSelectingEnabled",
  },
  isHighlightCurrentLineEnabled: {
    category: "currentLine",
    key: "isHighlightCurrentLineEnabled",
  },
  isFadeLinesEnabled: { category: "currentLine", key: "isFadeLinesEnabled" },
  fadeLinesIntensity: { category: "currentLine", key: "fadeLinesIntensity" },
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: {
    category: "currentLine",
    key: "isHighlightCurrentLineOnlyInFocusedEditorEnabled",
  },
  currentLineHighlightStyle: {
    category: "currentLine",
    key: "currentLineHighlightStyle",
  },
  currentLineHighlightUnderlineThickness: {
    category: "currentLine",
    key: "currentLineHighlightUnderlineThickness",
  },
  "currentLineHighlightColor-dark": {
    category: "currentLine",
    key: "currentLineHighlightColor-dark",
  },
  "currentLineHighlightColor-light": {
    category: "currentLine",
    key: "currentLineHighlightColor-light",
  },
  doesWritingFocusShowHeader: {
    category: "writingFocus",
    key: "doesWritingFocusShowHeader",
  },
  doesWritingFocusShowVignette: {
    category: "writingFocus",
    key: "doesWritingFocusShowVignette",
  },
  doesWritingFocusShowStatusBar: {
    category: "writingFocus",
    key: "doesWritingFocusShowStatusBar",
  },
  isWritingFocusFullscreen: {
    category: "writingFocus",
    key: "isWritingFocusFullscreen",
  },
  writingFocusVignetteStyle: {
    category: "writingFocus",
    key: "writingFocusVignetteStyle",
  },
  isRestoreCursorPositionEnabled: {
    category: "restoreCursorPosition",
    key: "isRestoreCursorPositionEnabled",
  },
};

// Helper functions for accessing nested settings with flat keys
export function getSetting<K extends keyof LegacyTypewriterModeSettings>(
  settings: TypewriterModeSettings,
  key: K
): LegacyTypewriterModeSettings[K] {
  const path = SETTINGS_PATHS[key];
  return settings[path.category][
    path.key as keyof (typeof settings)[typeof path.category]
  ];
}

export function setSetting<K extends keyof LegacyTypewriterModeSettings>(
  settings: TypewriterModeSettings,
  key: K,
  value: LegacyTypewriterModeSettings[K]
): void {
  const path = SETTINGS_PATHS[key];
  // biome-ignore lint/suspicious/noExplicitAny: simple workaround
  // @ts-expect-error
  settings[path.category][path.key] = value;
}

// Migration function to convert legacy flat settings to new grouped settings
export function migrateSettings(
  settings:
    | Partial<LegacyTypewriterModeSettings>
    | Partial<TypewriterModeSettings>
): TypewriterModeSettings {
  // Check if settings are already in new format
  if ("general" in settings && settings.general !== undefined) {
    return {
      ...DEFAULT_SETTINGS,
      ...settings,
    } as TypewriterModeSettings;
  }

  // Migrate from legacy flat format
  const legacy = settings as Partial<LegacyTypewriterModeSettings>;
  return {
    general: {
      version: legacy.version ?? DEFAULT_SETTINGS.general.version,
      isAnnounceUpdatesEnabled:
        legacy.isAnnounceUpdatesEnabled ??
        DEFAULT_SETTINGS.general.isAnnounceUpdatesEnabled,
      isPluginActivated:
        legacy.isPluginActivated ?? DEFAULT_SETTINGS.general.isPluginActivated,
      isOnlyActivateAfterFirstInteractionEnabled:
        legacy.isOnlyActivateAfterFirstInteractionEnabled ??
        DEFAULT_SETTINGS.general.isOnlyActivateAfterFirstInteractionEnabled,
    },
    typewriter: {
      isTypewriterScrollEnabled:
        legacy.isTypewriterScrollEnabled ??
        DEFAULT_SETTINGS.typewriter.isTypewriterScrollEnabled,
      isOnlyMaintainTypewriterOffsetWhenReachedEnabled:
        legacy.isOnlyMaintainTypewriterOffsetWhenReachedEnabled ??
        DEFAULT_SETTINGS.typewriter
          .isOnlyMaintainTypewriterOffsetWhenReachedEnabled,
      isTypewriterOnlyUseCommandsEnabled:
        legacy.isTypewriterOnlyUseCommandsEnabled ??
        DEFAULT_SETTINGS.typewriter.isTypewriterOnlyUseCommandsEnabled,
      typewriterOffset:
        legacy.typewriterOffset ?? DEFAULT_SETTINGS.typewriter.typewriterOffset,
    },
    keepLinesAboveAndBelow: {
      isKeepLinesAboveAndBelowEnabled:
        legacy.isKeepLinesAboveAndBelowEnabled ??
        DEFAULT_SETTINGS.keepLinesAboveAndBelow.isKeepLinesAboveAndBelowEnabled,
      linesAboveAndBelow:
        legacy.linesAboveAndBelow ??
        DEFAULT_SETTINGS.keepLinesAboveAndBelow.linesAboveAndBelow,
    },
    maxChars: {
      isMaxCharsPerLineEnabled:
        legacy.isMaxCharsPerLineEnabled ??
        DEFAULT_SETTINGS.maxChars.isMaxCharsPerLineEnabled,
      maxCharsPerLine:
        legacy.maxCharsPerLine ?? DEFAULT_SETTINGS.maxChars.maxCharsPerLine,
    },
    dimming: {
      isDimUnfocusedEnabled:
        legacy.isDimUnfocusedEnabled ??
        DEFAULT_SETTINGS.dimming.isDimUnfocusedEnabled,
      isDimHighlightListParentEnabled:
        legacy.isDimHighlightListParentEnabled ??
        DEFAULT_SETTINGS.dimming.isDimHighlightListParentEnabled,
      isDimTableAsOneEnabled:
        legacy.isDimTableAsOneEnabled ??
        DEFAULT_SETTINGS.dimming.isDimTableAsOneEnabled,
      dimUnfocusedMode:
        legacy.dimUnfocusedMode ?? DEFAULT_SETTINGS.dimming.dimUnfocusedMode,
      dimUnfocusedEditorsBehavior:
        legacy.dimUnfocusedEditorsBehavior ??
        DEFAULT_SETTINGS.dimming.dimUnfocusedEditorsBehavior,
      dimmedOpacity:
        legacy.dimmedOpacity ?? DEFAULT_SETTINGS.dimming.dimmedOpacity,
      isPauseDimUnfocusedWhileScrollingEnabled:
        legacy.isPauseDimUnfocusedWhileScrollingEnabled ??
        DEFAULT_SETTINGS.dimming.isPauseDimUnfocusedWhileScrollingEnabled,
      isPauseDimUnfocusedWhileSelectingEnabled:
        legacy.isPauseDimUnfocusedWhileSelectingEnabled ??
        DEFAULT_SETTINGS.dimming.isPauseDimUnfocusedWhileSelectingEnabled,
    },
    currentLine: {
      isHighlightCurrentLineEnabled:
        legacy.isHighlightCurrentLineEnabled ??
        DEFAULT_SETTINGS.currentLine.isHighlightCurrentLineEnabled,
      isFadeLinesEnabled:
        legacy.isFadeLinesEnabled ??
        DEFAULT_SETTINGS.currentLine.isFadeLinesEnabled,
      fadeLinesIntensity:
        legacy.fadeLinesIntensity ??
        DEFAULT_SETTINGS.currentLine.fadeLinesIntensity,
      isHighlightCurrentLineOnlyInFocusedEditorEnabled:
        legacy.isHighlightCurrentLineOnlyInFocusedEditorEnabled ??
        DEFAULT_SETTINGS.currentLine
          .isHighlightCurrentLineOnlyInFocusedEditorEnabled,
      currentLineHighlightStyle:
        legacy.currentLineHighlightStyle ??
        DEFAULT_SETTINGS.currentLine.currentLineHighlightStyle,
      currentLineHighlightUnderlineThickness:
        legacy.currentLineHighlightUnderlineThickness ??
        DEFAULT_SETTINGS.currentLine.currentLineHighlightUnderlineThickness,
      "currentLineHighlightColor-dark":
        legacy["currentLineHighlightColor-dark"] ??
        DEFAULT_SETTINGS.currentLine["currentLineHighlightColor-dark"],
      "currentLineHighlightColor-light":
        legacy["currentLineHighlightColor-light"] ??
        DEFAULT_SETTINGS.currentLine["currentLineHighlightColor-light"],
    },
    writingFocus: {
      doesWritingFocusShowHeader:
        legacy.doesWritingFocusShowHeader ??
        DEFAULT_SETTINGS.writingFocus.doesWritingFocusShowHeader,
      doesWritingFocusShowVignette:
        legacy.doesWritingFocusShowVignette ??
        DEFAULT_SETTINGS.writingFocus.doesWritingFocusShowVignette,
      doesWritingFocusShowStatusBar:
        legacy.doesWritingFocusShowStatusBar ??
        DEFAULT_SETTINGS.writingFocus.doesWritingFocusShowStatusBar,
      isWritingFocusFullscreen:
        legacy.isWritingFocusFullscreen ??
        DEFAULT_SETTINGS.writingFocus.isWritingFocusFullscreen,
      writingFocusVignetteStyle:
        legacy.writingFocusVignetteStyle ??
        DEFAULT_SETTINGS.writingFocus.writingFocusVignetteStyle,
    },
    restoreCursorPosition: {
      isRestoreCursorPositionEnabled:
        legacy.isRestoreCursorPositionEnabled ??
        DEFAULT_SETTINGS.restoreCursorPosition.isRestoreCursorPositionEnabled,
      cursorPositions: {},
    },
  };
}

// Migration function to copy cursor positions from old file to settings
export async function migrateCursorPositions(
  settings: TypewriterModeSettings,
  vault: {
    adapter: {
      exists: (path: string) => Promise<boolean>;
      read: (path: string) => Promise<string>;
    };
  },
  manifestDir: string
): Promise<TypewriterModeSettings> {
  // Skip if cursor positions already exist in settings (already migrated)
  if (Object.keys(settings.restoreCursorPosition.cursorPositions).length > 0) {
    return settings;
  }

  const oldFilePath = `${manifestDir}/cursor-positions.json`;

  try {
    if (await vault.adapter.exists(oldFilePath)) {
      const data = await vault.adapter.read(oldFilePath);
      const cursorPositions = JSON.parse(data);
      settings.restoreCursorPosition.cursorPositions = cursorPositions;
      console.debug(
        "Migrated cursor positions from cursor-positions.json to data.json"
      );
    }
  } catch (error) {
    console.error("Failed to migrate cursor positions:", error);
  }

  return settings;
}
