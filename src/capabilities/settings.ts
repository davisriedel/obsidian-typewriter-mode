import type { Vault } from "obsidian";
import {
  CURRENT_LINE_HIGHLIGHT_STYLE,
  type CurrentLineHighlightStyle,
  DIM_UNFOCUSED_EDITORS_BEHAVIOR,
  DIM_UNFOCUSED_MODE,
  type DimUnfocusedEditorsBehavior,
  type DimUnfocusedMode,
  ENABLED_PLATFORMS,
  type EnabledPlatforms,
  WRITING_FOCUS_VIGNETTE_STYLE,
  type WritingFocusVignetteStyle,
} from "./constants";

export interface GeneralSettings {
  disabledFilePaths: string[];
  enabledFilePaths: string[];
  enabledPlatforms: EnabledPlatforms;
  isAnnounceUpdatesEnabled: boolean;
  isOnlyActivateAfterFirstInteractionEnabled: boolean;
  isPluginActivated: boolean;
  version: string | null;
}

export interface TypewriterSettings {
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: boolean;
  isTypewriterOnlyUseCommandsEnabled: boolean;
  isTypewriterScrollEnabled: boolean;
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
  dimmedOpacity: number;
  dimUnfocusedEditorsBehavior: DimUnfocusedEditorsBehavior;
  dimUnfocusedMode: DimUnfocusedMode;
  isDimHighlightListParentEnabled: boolean;
  isDimTableAsOneEnabled: boolean;
  isDimUnfocusedEnabled: boolean;
  isDimUnfocusedOnlyInWritingFocusModeEnabled: boolean;
  isPauseDimUnfocusedWhileScrollingEnabled: boolean;
  isPauseDimUnfocusedWhileSelectingEnabled: boolean;
}

export interface CurrentLineSettings {
  "currentLineHighlightColor-dark": string;
  "currentLineHighlightColor-light": string;
  currentLineHighlightStyle: CurrentLineHighlightStyle;
  currentLineHighlightUnderlineThickness: number;
  fadeLinesIntensity: number;
  isFadeLinesEnabled: boolean;
  isFadeLinesOnlyInWritingFocusModeEnabled: boolean;
  isHighlightCurrentLineEnabled: boolean;
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
  isHighlightCurrentLineOnlyInWritingFocusModeEnabled: boolean;
  isPauseCurrentLineHighlightWhileScrollingEnabled: boolean;
  isPauseCurrentLineHighlightWhileSelectingEnabled: boolean;
}

export interface WritingFocusSettings {
  doesWritingFocusShowHeader: boolean;
  doesWritingFocusShowStatusBar: boolean;
  doesWritingFocusShowVignette: boolean;
  isWritingFocusFullscreen: boolean;
  writingFocusFontSize: number;
  writingFocusVignetteStyle: WritingFocusVignetteStyle;
}

export interface RestoreCursorPositionSettings {
  cursorPositions: Record<string, unknown>;
  isRestoreCursorPositionEnabled: boolean;
}

export interface HemingwayModeSettings {
  hemingwayModeStatusBarText: string | null;
  isAllowBackspaceInHemingwayModeEnabled: boolean;
  isHemingwayModeEnabled: boolean;
  isHemingwayModeOnlyInWritingFocusModeEnabled: boolean;
  isShowHemingwayModeStatusBarEnabled: boolean;
}

export interface TypewriterModeSettings {
  currentLine: CurrentLineSettings;
  dimming: DimmingSettings;
  general: GeneralSettings;
  hemingwayMode: HemingwayModeSettings;
  keepLinesAboveAndBelow: KeepLinesAboveAndBelowSettings;
  maxChars: MaxCharsSettings;
  restoreCursorPosition: RestoreCursorPositionSettings;
  typewriter: TypewriterSettings;
  writingFocus: WritingFocusSettings;
}

// Typesafe dotted-path type for accessing nested settings
// e.g. "typewriter.isTypewriterScrollEnabled", "general.version"
export type SettingsPath = {
  [C in keyof TypewriterModeSettings]: `${C & string}.${keyof TypewriterModeSettings[C] & string}`;
}[keyof TypewriterModeSettings];

export type SettingValueAtPath<P extends SettingsPath> =
  P extends `${infer C}.${infer K}`
    ? C extends keyof TypewriterModeSettings
      ? K extends keyof TypewriterModeSettings[C]
        ? TypewriterModeSettings[C][K]
        : never
      : never
    : never;

export function getSettingByPath<P extends SettingsPath>(
  settings: TypewriterModeSettings,
  path: P
): SettingValueAtPath<P> {
  const dot = path.indexOf(".");
  const category = path.slice(0, dot) as keyof TypewriterModeSettings;
  const key = path.slice(dot + 1);
  return settings[category][key as never] as SettingValueAtPath<P>;
}

export function setSettingByPath<P extends SettingsPath>(
  settings: TypewriterModeSettings,
  path: P,
  value: SettingValueAtPath<P>
): void {
  const dot = path.indexOf(".");
  const category = path.slice(0, dot) as keyof TypewriterModeSettings;
  const key = path.slice(dot + 1);
  // @ts-expect-error
  settings[category][key] = value;
}

export const DEFAULT_SETTINGS: TypewriterModeSettings = {
  currentLine: {
    "currentLineHighlightColor-dark": "#444444",
    "currentLineHighlightColor-light": "#dddddd",
    currentLineHighlightStyle: CURRENT_LINE_HIGHLIGHT_STYLE.BOX,
    currentLineHighlightUnderlineThickness: 1,
    fadeLinesIntensity: 0.5,
    isFadeLinesEnabled: false,
    isFadeLinesOnlyInWritingFocusModeEnabled: false,
    isHighlightCurrentLineEnabled: true,
    isHighlightCurrentLineOnlyInFocusedEditorEnabled: false,
    isHighlightCurrentLineOnlyInWritingFocusModeEnabled: false,
    isPauseCurrentLineHighlightWhileScrollingEnabled: false,
    isPauseCurrentLineHighlightWhileSelectingEnabled: false,
  },
  dimming: {
    dimmedOpacity: 0.25,
    dimUnfocusedEditorsBehavior: DIM_UNFOCUSED_EDITORS_BEHAVIOR.DIM,
    dimUnfocusedMode: DIM_UNFOCUSED_MODE.PARAGRAPHS,
    isDimHighlightListParentEnabled: false,
    isDimTableAsOneEnabled: true,
    isDimUnfocusedEnabled: false,
    isDimUnfocusedOnlyInWritingFocusModeEnabled: false,
    isPauseDimUnfocusedWhileScrollingEnabled: true,
    isPauseDimUnfocusedWhileSelectingEnabled: true,
  },
  general: {
    disabledFilePaths: [],
    enabledFilePaths: [],
    enabledPlatforms: ENABLED_PLATFORMS.BOTH,
    isAnnounceUpdatesEnabled: true,
    isOnlyActivateAfterFirstInteractionEnabled: false,
    isPluginActivated: true,
    version: null,
  },
  hemingwayMode: {
    hemingwayModeStatusBarText: null,
    isAllowBackspaceInHemingwayModeEnabled: false,
    isHemingwayModeEnabled: false,
    isHemingwayModeOnlyInWritingFocusModeEnabled: false,
    isShowHemingwayModeStatusBarEnabled: true,
  },
  keepLinesAboveAndBelow: {
    isKeepLinesAboveAndBelowEnabled: false,
    linesAboveAndBelow: 5,
  },
  maxChars: {
    isMaxCharsPerLineEnabled: false,
    maxCharsPerLine: 64,
  },
  restoreCursorPosition: {
    cursorPositions: {},
    isRestoreCursorPositionEnabled: false,
  },
  typewriter: {
    isOnlyMaintainTypewriterOffsetWhenReachedEnabled: false,
    isTypewriterOnlyUseCommandsEnabled: false,
    isTypewriterScrollEnabled: true,
    typewriterOffset: 0.5,
  },
  writingFocus: {
    doesWritingFocusShowHeader: false,
    doesWritingFocusShowStatusBar: false,
    doesWritingFocusShowVignette: true,
    isWritingFocusFullscreen: true,
    writingFocusFontSize: 0,
    writingFocusVignetteStyle: WRITING_FOCUS_VIGNETTE_STYLE.BOX,
  },
};

// Legacy flat settings structure for migration
interface LegacyTypewriterModeSettings {
  "currentLineHighlightColor-dark": string;
  "currentLineHighlightColor-light": string;
  currentLineHighlightStyle: CurrentLineHighlightStyle;
  currentLineHighlightUnderlineThickness: number;
  dimmedOpacity: number;
  dimUnfocusedEditorsBehavior: DimUnfocusedEditorsBehavior;
  dimUnfocusedMode: DimUnfocusedMode;
  doesWritingFocusShowHeader: boolean;
  doesWritingFocusShowStatusBar: boolean;
  doesWritingFocusShowVignette: boolean;
  fadeLinesIntensity: number;
  hemingwayModeStatusBarText: string;
  isAllowBackspaceInHemingwayModeEnabled: boolean;
  isAnnounceUpdatesEnabled: boolean;
  isDimHighlightListParentEnabled: boolean;
  isDimTableAsOneEnabled: boolean;
  isDimUnfocusedEnabled: boolean;
  isFadeLinesEnabled: boolean;
  isHemingwayModeEnabled: boolean;
  isHighlightCurrentLineEnabled: boolean;
  isHighlightCurrentLineOnlyInFocusedEditorEnabled: boolean;
  isKeepLinesAboveAndBelowEnabled: boolean;
  isMaxCharsPerLineEnabled: boolean;
  isOnlyActivateAfterFirstInteractionEnabled: boolean;
  isOnlyMaintainTypewriterOffsetWhenReachedEnabled: boolean;
  isPauseDimUnfocusedWhileScrollingEnabled: boolean;
  isPauseDimUnfocusedWhileSelectingEnabled: boolean;
  isPluginActivated: boolean;
  isRestoreCursorPositionEnabled: boolean;
  isShowHemingwayModeStatusBarEnabled: boolean;
  isTypewriterOnlyUseCommandsEnabled: boolean;
  isTypewriterScrollEnabled: boolean;
  isWritingFocusFullscreen: boolean;
  linesAboveAndBelow: number;
  maxCharsPerLine: number;
  typewriterOffset: number;
  version: string | null;
  writingFocusFontSize: number;
  writingFocusVignetteStyle: WritingFocusVignetteStyle;
}

// Migration function to convert legacy flat settings to new grouped settings
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migration function necessarily handles many legacy fields
function migrateSettings(
  legacy: Partial<LegacyTypewriterModeSettings>
): TypewriterModeSettings {
  // Migrate from legacy flat format
  return {
    currentLine: {
      "currentLineHighlightColor-dark":
        legacy["currentLineHighlightColor-dark"] ??
        DEFAULT_SETTINGS.currentLine["currentLineHighlightColor-dark"],
      "currentLineHighlightColor-light":
        legacy["currentLineHighlightColor-light"] ??
        DEFAULT_SETTINGS.currentLine["currentLineHighlightColor-light"],
      currentLineHighlightStyle:
        legacy.currentLineHighlightStyle ??
        DEFAULT_SETTINGS.currentLine.currentLineHighlightStyle,
      currentLineHighlightUnderlineThickness:
        legacy.currentLineHighlightUnderlineThickness ??
        DEFAULT_SETTINGS.currentLine.currentLineHighlightUnderlineThickness,
      fadeLinesIntensity:
        legacy.fadeLinesIntensity ??
        DEFAULT_SETTINGS.currentLine.fadeLinesIntensity,
      isFadeLinesEnabled:
        legacy.isFadeLinesEnabled ??
        DEFAULT_SETTINGS.currentLine.isFadeLinesEnabled,
      isFadeLinesOnlyInWritingFocusModeEnabled:
        DEFAULT_SETTINGS.currentLine.isFadeLinesOnlyInWritingFocusModeEnabled,
      isHighlightCurrentLineEnabled:
        legacy.isHighlightCurrentLineEnabled ??
        DEFAULT_SETTINGS.currentLine.isHighlightCurrentLineEnabled,
      isHighlightCurrentLineOnlyInFocusedEditorEnabled:
        legacy.isHighlightCurrentLineOnlyInFocusedEditorEnabled ??
        DEFAULT_SETTINGS.currentLine
          .isHighlightCurrentLineOnlyInFocusedEditorEnabled,
      isHighlightCurrentLineOnlyInWritingFocusModeEnabled:
        DEFAULT_SETTINGS.currentLine
          .isHighlightCurrentLineOnlyInWritingFocusModeEnabled,
      isPauseCurrentLineHighlightWhileScrollingEnabled:
        DEFAULT_SETTINGS.currentLine
          .isPauseCurrentLineHighlightWhileScrollingEnabled,
      isPauseCurrentLineHighlightWhileSelectingEnabled:
        DEFAULT_SETTINGS.currentLine
          .isPauseCurrentLineHighlightWhileSelectingEnabled,
    },
    dimming: {
      dimmedOpacity:
        legacy.dimmedOpacity ?? DEFAULT_SETTINGS.dimming.dimmedOpacity,
      dimUnfocusedEditorsBehavior:
        legacy.dimUnfocusedEditorsBehavior ??
        DEFAULT_SETTINGS.dimming.dimUnfocusedEditorsBehavior,
      dimUnfocusedMode:
        legacy.dimUnfocusedMode ?? DEFAULT_SETTINGS.dimming.dimUnfocusedMode,
      isDimHighlightListParentEnabled:
        legacy.isDimHighlightListParentEnabled ??
        DEFAULT_SETTINGS.dimming.isDimHighlightListParentEnabled,
      isDimTableAsOneEnabled:
        legacy.isDimTableAsOneEnabled ??
        DEFAULT_SETTINGS.dimming.isDimTableAsOneEnabled,
      isDimUnfocusedEnabled:
        legacy.isDimUnfocusedEnabled ??
        DEFAULT_SETTINGS.dimming.isDimUnfocusedEnabled,
      isDimUnfocusedOnlyInWritingFocusModeEnabled:
        DEFAULT_SETTINGS.dimming.isDimUnfocusedOnlyInWritingFocusModeEnabled,
      isPauseDimUnfocusedWhileScrollingEnabled:
        legacy.isPauseDimUnfocusedWhileScrollingEnabled ??
        DEFAULT_SETTINGS.dimming.isPauseDimUnfocusedWhileScrollingEnabled,
      isPauseDimUnfocusedWhileSelectingEnabled:
        legacy.isPauseDimUnfocusedWhileSelectingEnabled ??
        DEFAULT_SETTINGS.dimming.isPauseDimUnfocusedWhileSelectingEnabled,
    },
    general: {
      disabledFilePaths: DEFAULT_SETTINGS.general.disabledFilePaths,
      enabledFilePaths: DEFAULT_SETTINGS.general.enabledFilePaths,
      enabledPlatforms: DEFAULT_SETTINGS.general.enabledPlatforms,
      isAnnounceUpdatesEnabled:
        legacy.isAnnounceUpdatesEnabled ??
        DEFAULT_SETTINGS.general.isAnnounceUpdatesEnabled,
      isOnlyActivateAfterFirstInteractionEnabled:
        legacy.isOnlyActivateAfterFirstInteractionEnabled ??
        DEFAULT_SETTINGS.general.isOnlyActivateAfterFirstInteractionEnabled,
      isPluginActivated:
        legacy.isPluginActivated ?? DEFAULT_SETTINGS.general.isPluginActivated,
      version: legacy.version ?? DEFAULT_SETTINGS.general.version,
    },
    hemingwayMode: {
      hemingwayModeStatusBarText:
        legacy.hemingwayModeStatusBarText &&
        legacy.hemingwayModeStatusBarText !== "Hemingway"
          ? legacy.hemingwayModeStatusBarText
          : DEFAULT_SETTINGS.hemingwayMode.hemingwayModeStatusBarText,
      isAllowBackspaceInHemingwayModeEnabled:
        legacy.isAllowBackspaceInHemingwayModeEnabled ??
        DEFAULT_SETTINGS.hemingwayMode.isAllowBackspaceInHemingwayModeEnabled,
      isHemingwayModeEnabled:
        legacy.isHemingwayModeEnabled ??
        DEFAULT_SETTINGS.hemingwayMode.isHemingwayModeEnabled,
      isHemingwayModeOnlyInWritingFocusModeEnabled:
        DEFAULT_SETTINGS.hemingwayMode
          .isHemingwayModeOnlyInWritingFocusModeEnabled,
      isShowHemingwayModeStatusBarEnabled:
        legacy.isShowHemingwayModeStatusBarEnabled ??
        DEFAULT_SETTINGS.hemingwayMode.isShowHemingwayModeStatusBarEnabled,
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
    restoreCursorPosition: {
      cursorPositions: {},
      isRestoreCursorPositionEnabled:
        legacy.isRestoreCursorPositionEnabled ??
        DEFAULT_SETTINGS.restoreCursorPosition.isRestoreCursorPositionEnabled,
    },
    typewriter: {
      isOnlyMaintainTypewriterOffsetWhenReachedEnabled:
        legacy.isOnlyMaintainTypewriterOffsetWhenReachedEnabled ??
        DEFAULT_SETTINGS.typewriter
          .isOnlyMaintainTypewriterOffsetWhenReachedEnabled,
      isTypewriterOnlyUseCommandsEnabled:
        legacy.isTypewriterOnlyUseCommandsEnabled ??
        DEFAULT_SETTINGS.typewriter.isTypewriterOnlyUseCommandsEnabled,
      isTypewriterScrollEnabled:
        legacy.isTypewriterScrollEnabled ??
        DEFAULT_SETTINGS.typewriter.isTypewriterScrollEnabled,
      typewriterOffset:
        legacy.typewriterOffset ?? DEFAULT_SETTINGS.typewriter.typewriterOffset,
    },
    writingFocus: {
      doesWritingFocusShowHeader:
        legacy.doesWritingFocusShowHeader ??
        DEFAULT_SETTINGS.writingFocus.doesWritingFocusShowHeader,
      doesWritingFocusShowStatusBar:
        legacy.doesWritingFocusShowStatusBar ??
        DEFAULT_SETTINGS.writingFocus.doesWritingFocusShowStatusBar,
      doesWritingFocusShowVignette:
        legacy.doesWritingFocusShowVignette ??
        DEFAULT_SETTINGS.writingFocus.doesWritingFocusShowVignette,
      isWritingFocusFullscreen:
        legacy.isWritingFocusFullscreen ??
        DEFAULT_SETTINGS.writingFocus.isWritingFocusFullscreen,
      writingFocusFontSize:
        legacy.writingFocusFontSize ??
        DEFAULT_SETTINGS.writingFocus.writingFocusFontSize,
      writingFocusVignetteStyle:
        legacy.writingFocusVignetteStyle ??
        DEFAULT_SETTINGS.writingFocus.writingFocusVignetteStyle,
    },
  };
}

// Migration function to copy cursor positions from old file to settings
// Only needed when coming from pre-v1.2.0 (legacy flat format)
async function migrateCursorPositions(
  settings: TypewriterModeSettings,
  vault: Vault,
  manifestDir: string
): Promise<TypewriterModeSettings> {
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

// Apply all startup migrations in a single pass, version-gated via the general.version key.
// Cursor position migration (from cursor-positions.json) is only needed for pre-v1.2.0 data
// which is identified by the absence of the top-level "general" key.
export interface StartupMigrationResult {
  requiresSave: boolean;
  settings: TypewriterModeSettings;
}

export async function applyStartupMigrations(
  rawData:
    | Partial<LegacyTypewriterModeSettings>
    | Partial<TypewriterModeSettings>,
  vault: Vault,
  manifestDir: string
): Promise<StartupMigrationResult> {
  const isLegacyFormat = !("general" in rawData);

  // Cursor positions migration only needed when coming from pre-v1.2.0 (legacy flat format).
  // Since v1.2.0 cursor positions are stored directly in data.json.
  if (isLegacyFormat) {
    const settings = migrateSettings(
      rawData as Partial<LegacyTypewriterModeSettings>
    );
    return {
      requiresSave: true,
      settings: await migrateCursorPositions(settings, vault, manifestDir),
    };
  }

  return { requiresSave: false, settings: rawData as TypewriterModeSettings };
}
