# Changelog

## 1.0.0-rc.3

- Fix current line not moving when scrolling on mobile

## 1.0.0-rc.2

- Fix current line highlight not transparent on iOS (webkit)
- Fix update modal

- _Developer notes:_
  - _We have migrated from SCSS @import to @use_

## 1.0.0-rc.1

- You can now disable the plugin on a per-file basis. Include `typewriter-mode: false` in the file's frontmatter to disable the plugin in that file.

- Tables are now correctly dimmed

- In the settings, you can now choose to undim all table cells or only the active cell when editing a table

- Update notice now includes pre-releases if you update to a pre-release

- The current line highlight now scrolls with the text and is not hidden anymore when scrolling

- Multiple bug fixes and improvements for fullscreen writing focus

- Fix typewriter scrolling in new obsidian tables

- Minor changes to comply with [Obsidian October O\_O 2024 plugin self-critique checklist](https://docs.obsidian.md/oo24/plugin).

- New feature: While navigating in lists in dimming mode, you can enable to highlight/not dim direct parents/grandparents/... of the current list item. (See issue #86).

- Add "fade lines" feature that places a gradient on the lines above and below the current line, making the text fade out more and more towards the top and bottom of the editor.

- _Developer notes:_
  - _We are now using Bun for bundling. Since bundling CJS format with bun is experimental at the moment, we have to use the canary version for now._
  - _The whole codebase was refactored and many new features were introduced. This release candidate must be thoroughly tested before release._

## 0.0.14

- Make current line highlight at least as big as cursor
- Fixed bug preventing mobile users from using version 0.0.12
- Plugin is now only enabled in markdown files to avoid issues with several plugins like canvas, kanban, and lineage
- Minor bug fixes
- Rewritten the algorithm that positions the current line highlight. This fixes the alignment of the line highlight and improves performance.
- Fullscreen writing focus now uses the native electron fullscreen API. Note: this means you can no longer exit it with the ESC key, but the ESC key remains available for Obsidian, e.g. in the command pallette. Use the `Toggle Writing Focus` command or exit Fullscreen Mode with the native command of your OS to exit writing focus.
- You can now keep the statusbar visible in writing focus.

## Removed: 0.0.12, 0.0.13

Versions 0.0.12 and 0.0.13 have been removed due to major bugs. The features introduced in those versions are included in 0.0.14.

## 0.0.11

- New feature: Highlight active sentence (dim all other sentences, not only paragraphs)
- Reworked settings panel (now all settings can be edited, even for inactive features)
- Fixed compatibility of "Only maintain typewriter offset when reached" with "go to top" commands (e.g. vim mode)
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

- Fixed "Only activate after first interaction"
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
