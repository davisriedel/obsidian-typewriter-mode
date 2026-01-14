# Changelog

## 1.3.0-beta.1

- Add hemingway mode which disables editing text and only allows writing forwards

## 1.2.0-beta.2

- Add color picker and opacity slider for current line highlight color, instead of plain
text field
- Group settings using the new `SettingGroup` from Obsidian API

## 1.2.0-beta.1

- Add custom font size option for writing focus mode
- Fix cursor position restoration when typewriter scrolling is disabled
- Cursor position data is now stored in data.json instead of cursor-positions.json to enable syncing across devices via Obsidian Sync
- Update dependencies
- Add Ultracite for automated code quality enforcement
- Codebase refactoring and improvements

## 1.1.1-beta.1

Switch to grass for compiling sass faster.

## 1.1.0

This update adds a `restore cursor position` functionality. When you open a file the
cursor will automatically jump to the position it was at when you edited the file the last
time. This lets you continue right where you left off. **The feature is _not_ enabled by
default. You can enable it in the plugin's settings.**

The feature is similar to the incredible [Remember Cursor Position](https://arc.net/l/quote/jmvjfrza) by [dy-sh](https://github.com/dy-sh) and loosely based on it. But it should provide a better performance, because it does not store the cursor position based on a timer, but only when the cursor actually moves (which is when the Typewriter Mode plugin runs its updates anyway).

_Other minor changes include:_

- Fix live update of current line highlight style setting
- Add commands to toggle/activate/deactivate the complete plugin
- Internal code restructuring
- Bug fixes

## 1.1.0-beta.3

- Fix live update of current line highlight style setting
- Add commands to toggle/activate/deactivate the complete plugin

## 1.1.0-beta.2

- Internal code restructuring
- Bug fixes

## 1.1.0-beta.1

- Add feature to remember and restore last cursor position per file

## 1.0.0

- The current line highlight now scrolls with the text and is not hidden anymore when scrolling
- While navigating lists in dimming mode, you can enable to highlight all parents of the current list item.
- Compatibility with Obsidian tables
  - Typewriter scrolling in tables fixed
  - Dimming of tables implemented
  - In the settings, you can now choose to undim all table cells or only the active cell when editing a table
- Add “fade lines” feature that places a gradient on the lines above and below the current line, making the text fade out more and more towards the top and bottom of the editor.
- You can now disable the plugin on a per-file basis. Include `typewriter-mode: false` in the file's frontmatter to disable the plugin in that file.
- Add enable / disable commands for all toggle commands
- The update notice dialog now includes pre-releases if you update to a pre-release
- Fixed a bug that caused the editor padding to change, when disabling typewriter mode
- Multiple bug fixes and improvements for fullscreen writing focus
- Now complying with the [Obsidian October O\_O 2024 plugin self-critique checklist](https://docs.obsidian.md/oo24/plugin).

**Note:** _The codebase has gone through extensive refactorings and the build system was
changed._

## 0.0.14

- Make current line highlight at least as big as cursor
- Fixed bug preventing mobile users from using version 0.0.12
- Plugin is now only enabled in markdown files to avoid issues with several plugins like canvas, kanban, and lineage
- Minor bug fixes
- Rewritten the algorithm that positions the current line highlight. This fixes the alignment of the line highlight and improves performance.
- Fullscreen writing focus now uses the native electron fullscreen API. Note: this means you can no longer exit it with the ESC key, but the ESC key remains available for Obsidian, e.g. in the command pallette. Use the `Toggle Writing Focus` command or exit Fullscreen Mode with the native command of your OS to exit writing focus.
- You can now keep the statusbar visible in writing focus.

## 0.0.11

- New feature: Highlight active sentence (dim all other sentences, not only paragraphs)
- Reworked settings panel (now all settings can be edited, even for inactive features)
- Fixed compatibility of “Only maintain typewriter offset when reached” with “go to top” commands (e.g. vim mode)
- Fixed current line highlight position with custom line heights
- Fixed update modal scrolling

## 0.0.10

- Various bug fixes and improvements

## 0.0.9

- Completely rewrote the writing focus
  - This fixes:
    - \#64 (Fullscreen focus interferes with vim mode)
    - \#53 (Typewriter offset wrong in fullscreen mode)
    - \#44 (Cannot access command palette from fullscreen)
    - \#62 Let dropdown menu appear while writing in typewriter focus mode
  - The new implementation is based on [obsidian-focus-mode](https://github.com/ryanpcmcquen/obsidian-focus-mode) available under the MPL-2.0 license. Therefore, the code in the files `WritingFocus.ts` and `WritingFocus.scss` is available under the same license. The rest of the project remains MIT licensed.

## 0.0.8

- Fix toggling all typewriter mode features on and off
- Fix toggling paragraph dimming and other features

## 0.0.7

- Fixed interference with other plugins that use iframes

## 0.0.6

- Fixed “Only activate after first interaction”
- Fixed bug when using this plugin inside a canvas
- Added setting to disable the plugin in canvas
- Added multiple commands to quickly enable certain features or the whole plugin
- Added update announcement dialog

## 0.0.5

- Fixed a bug where setting changes were not updated unless Obsidian was reopened / force reloaded.

## 0.0.4

- Fixed compatibility with new obsidian table editor
- Fixed bug with current line highlight in light themes
- You can now set a different color for the line highlight for dark and light themes

## 0.0.3

- Fixed compatibility with vim mode
- Fixed typewriter dimming on separate window

## 0.0.2

Renamed all settings and commands to use sentence case according to [Obsidian's plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Use+sentence+case+in+UI).

## 0.0.1

Initial release of this plugin
