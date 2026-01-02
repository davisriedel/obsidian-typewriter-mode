export const DIM_UNFOCUSED_EDITORS_BEHAVIOR = {
  NONE: "dim-none",
  DIM: "dim",
  ALL: "dim-all",
} as const;

export type DimUnfocusedEditorsBehavior =
  (typeof DIM_UNFOCUSED_EDITORS_BEHAVIOR)[keyof typeof DIM_UNFOCUSED_EDITORS_BEHAVIOR];

export const DIM_UNFOCUSED_MODE = {
  PARAGRAPHS: "paragraphs",
  SENTENCES: "sentences",
} as const;

export type DimUnfocusedMode =
  (typeof DIM_UNFOCUSED_MODE)[keyof typeof DIM_UNFOCUSED_MODE];

export const CURRENT_LINE_HIGHLIGHT_STYLE = {
  BOX: "box",
  UNDERLINE: "underline",
} as const;

export type CurrentLineHighlightStyle =
  (typeof CURRENT_LINE_HIGHLIGHT_STYLE)[keyof typeof CURRENT_LINE_HIGHLIGHT_STYLE];

export const WRITING_FOCUS_VIGNETTE_STYLE = {
  BOX: "box",
  COLUMN: "column",
} as const;

export type WritingFocusVignetteStyle =
  (typeof WRITING_FOCUS_VIGNETTE_STYLE)[keyof typeof WRITING_FOCUS_VIGNETTE_STYLE];
