# Obsidian Typewriter Mode — Project Overview

**Typewriter Mode** is an Obsidian community plugin that transforms the editor into a distraction-free writing environment. It adds typewriter scrolling, current-line highlighting, text dimming, writing focus mode, Hemingway mode, and more.

- **Plugin ID**: `typewriter-mode`
- **Current version**: see `manifest.json`
- **Minimum Obsidian**: v0.15.0 (no legacy editor support)
- **Author**: Davis Riedel

---

## Tech Stack

| Tool | Role |
|------|------|
| **TypeScript** (strict) | Primary language |
| **Bun** | Runtime, package manager, bundler |
| **CodeMirror 6** | Editor manipulation (`@codemirror/state`, `@codemirror/view`) |
| **Obsidian API** | Plugin framework |
| **SCSS** (compiled via `grass`) | Styles |
| **Biome / Ultracite** | Linting and formatting |
| **Just** | Command runner |
| **Lefthook** | Git hooks |
| **Stylelint** | SCSS linting |

Path alias: `@/*` → `./src/*`

---

## Project Structure

```
src/
├── main.ts                        # Plugin entry point (onload/onunload)
├── lib.ts                         # Core coordinator: features, commands, settings, CM6 extensions
├── capabilities/
│   ├── base/                      # Abstract base classes (Feature, Command, ToggleCommand, …)
│   ├── features/                  # 10 feature categories (typewriter, dimming, currentLine, …)
│   ├── commands/                  # 8 commands (toggles, move typewriter up/down, writing focus)
│   ├── constants.ts               # Enums and shared constants
│   └── settings.ts                # Settings schema, types, defaults, migration
├── cm6/
│   ├── plugin.ts                  # CM6 ViewPlugin: decorations, scroll/resize, cursor tracking
│   ├── typewriter-offset-calculator.ts
│   ├── highlight-sentence.ts
│   ├── selectors.ts
│   └── per-window-props.ts
├── components/
│   ├── settings-tab.ts            # Settings UI panel (features register their own controls)
│   └── update-modal.ts            # Update announcement dialog
└── styles/
    ├── editor/                    # Editor-specific SCSS
    └── ui/                        # UI component SCSS
scripts/                           # Bun build/release scripts
test-vault/                        # Local Obsidian vault for manual testing
dist/                              # Compiled output (main.js, styles.css, manifest.json)
```

---

## Architecture

### Feature & Command System

**`TypewriterModeLib`** (`lib.ts`) is the central coordinator. It loads features and commands, manages CM6 extensions, handles settings persistence, and coordinates per-window CSS variables and body classes.

**Feature hierarchy:**
```
Loadable → Feature (typed settings path) → FeatureToggle (CSS class toggle)
                                               └── Concrete features
```

Each feature lives in `src/capabilities/features/` and self-registers its settings UI.

**Command hierarchy:**
```
AbstractCommand → Command | EditorCommand | ToggleCommand
```

### Settings System

- Nested, typed settings object with dotted-path access (`"typewriter.isTypewriterScrollEnabled"`)
- `getSettingByPath()` / `setSettingByPath()` for compile-time-safe access
- `applyStartupMigrations()` migrates legacy flat format (pre-v1.2.0) to the new grouped format
- Cursor positions per file are persisted in `data.json`

### CodeMirror 6 Integration

**`TypewriterModeCM6Plugin`** (`cm6/plugin.ts`) is a `ViewPlugin` that:
- Applies decorations for current-line highlighting and fading (not direct DOM manipulation)
- Calculates typewriter scroll offset
- Tracks cursor position changes for restoration
- Uses `ResizeObserver` for responsive updates
- Distinguishes user events from programmatic changes via transaction metadata
- Fires a custom `"moveByCommand"` event for command-driven cursor movement

### Plugin Lifecycle

1. `Plugin.onload()` → `lib.load()` → loads settings, features, commands, CM6 extension
2. `onLayoutReady()` → announces update if version changed
3. Editor operations → CM6 plugin reacts to view updates
4. `Plugin.onunload()` → `lib.unload()` → disables all features

---

## Commands

| Just task | Description |
|-----------|-------------|
| `just dev` | Build + set up test vault (main dev workflow) |
| `just build` | Build plugin only |
| `just debug` | Build with debug statements enabled |
| `just typecheck` | TypeScript type check |
| `just lint` | Biome lint & format |
| `just stylelint` | SCSS linting |
| `just markdownlint` | Markdown linting |
| `just check` | All of the above |
| `just release` | Run checks then release (creates tag + GitHub release) |
| `just ci` | CI build (used in GitHub Actions) |

Output artifacts: `dist/main.js`, `dist/styles.css`, `dist/manifest.json`

---

## Key Patterns

- **Decorations over DOM**: CM6 decorations (`RangeSet`) for all visual effects — avoids direct DOM manipulation
- **Per-window state**: CSS variables and body classes tracked per editor window
- **Settings migration**: One-pass migration on load, version-gated for backward compatibility
- **Self-registering features**: Each feature registers its own settings UI controls in `settings-tab.ts`
- **No barrel files**: Import directly from feature/command modules

---

# Ultracite Code Standards

This project uses **Ultracite**, a zero-config Biome preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides extremely fast Rust-based linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)

---

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
