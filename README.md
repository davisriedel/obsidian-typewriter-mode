# Typewriter Mode for Obsidian

Typewriter Mode is a plugin that adds typewriter scrolling (current line stays at a fixed position on the screen), a highlight for the current line, dimming of unfocused paragraphs and more to [Obsidian](https://obsidian.md).
All features can be turned on or off individually and have a variety of settings to customize their behavior to your liking.
Below you can find a list of all features and settings.

_These are a few exemplary screen captures:_
![Typewriter scrolling and current line highlighted](https://github.com/davisriedel/obsidian-typewriter-mode/raw/main/demo/typewriter.gif)
![Unfocused paragraphs dimmed](https://github.com/davisriedel/obsidian-typewriter-mode/raw/main/demo/dimming.gif)

## Features and Settings

- **Typewriter Scrolling:** _Turns typewriter scrolling on or off_
- **Typewriter Offset:** _Positions the typewriter line at the specified percentage of the screen_
- **Only Maintain Typewriter Offset When Reached:** _The line that the cursor is on will not be scrolled to the center of the editor until it the specified typewriter offset is reached. This removes the additional space at the top of the editor._
- **Do Not Snap Typewriter With Arrow Keys:** _The typewriter will only snap when using this plugin's move commands. It will not snap when using the arrow keys. The move commands are by default Cmd/Ctrl+ArrowUp/ArrowDown, but you can assign your own hotkeys for the move commands in Obsidian's settings._
- **Keep Lines Above And Below:** _When enabled, always keeps the specified amount of lines above and below the current line in view_
- **Amount of Lines Above and Below the Current Line:** _The amount of lines to always keep above and below the current line_
- **Highlight Current Line:** _Highlights the line that the cursor is currently on_
- **Current Line Highlight Color:** _The color of the current line highlight_
- **Current Line Highlight Style:** _The style of the current line highlight_ - _Box, Underline_
- **Current Line Underline Thickness:** _The thickness of the underline that highlights the current line_
- **Highlight Current Line Only In Focused Note:** _Only show highlighted line in the note / editor your cursor is on_
- **Dim Unfocused Paragraphs:** _Darkens unfocused paragraphs in the editor_
- **Dimmed Paragraphs' Opacity:** _The opacity of dimmed paragraphs_
- **Pause Dimming Unfocused Paragraphs While Scrolling:** _Paragraphs are not dimmed while scrolling_
- **Pause Dimming Unfocused Paragraphs While Selecting Text:** _Paragraphs are not dimmed while selecting text_
- **Paragraph Dimming Behavior in Unfocused Editors:** _How to dim paragraphs in unfocused editors_ - _Do Not Dim Any Paragraph, Dim All But Last Focused Paragraph, Dim All Paragraphs_
- **Only Activate After First Interaction:** _Activate the focused line highlight and paragraph dimming only after the first interaction with the editor_
- **Limit Maximum Number of Characters Per Line:** _Limits the maximum number of characters per line_
- **Maximum Number of Characters Per Line:** _The maximum number of characters per line_
- **Show Header in Fullscreen Writing Focus:** _If enabled, the header will be shown in fullscreen writing focus_
- **Fullscreen Writing Focus Vignette:** _Add a vignette to the edges of the screen in fullscreen writing focus_
- **Fullscreen Writing Focus Vignette Style:** _The style of the vignette in fullscreen writing focus mode_ - _Box, Column_

## Compatibility

This plugin is compatible with Obsidian v0.15.0 and above. It does not support the legacy editor.

## Installation

To install community plugins make sure _safe mode_ is turned off in Obsidian's settings.

### From within Obsidian

_This plugin was submitted to Obsidian and is currently being reviewed. As soon as it is accepted, you will be able to install it from within Obsidian by following these steps. In the meantime please use the installation methods stated in the section "From GitHub"._

<!-- You can install this plugin within Obsidian by doing the following: -->

- Go to Settings > Community Plugins > Browse
- Search for "Typewriter Mode"
- Click Install
- Click Enable

### From GitHub

#### Manual

1. Download the latest Release from the Releases section of the GitHub Repository
2. Extract the plugin folder from the zip to your vault's plugins folder: `<vault>/.obsidian/plugins/`. _Note: On some machines the `.obsidian` folder may be hidden. On macOS you should be able to press `Command+Shift+Dot` to show the folder in Finder._
3. Reload Obsidian

#### With BRAT

Follow the instructions in the repository of the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat#Quick-Guide-for-using-BRAT) and use this repository's URL: `https://github.com/davisriedel/obsidian-typewriter-mode` to install the plugin.

## Derived from

This plugin started as a fork of the incredible [Typewriter Scroll](https://github.com/deathau/cm-typewriter-scroll-obsidian) plugin by [deathau](https://github.com/deathau). It was turned into a separate plugin because many new features were added, breaking changes were introduced, and the code was completely restructured to make it more extensible.

## Development

The repo depends on the latest [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api).

If you want to contribute to this project or make your own changes, you can do so by following these steps:

1. Clone this repo
2. Install dependencies with `npm i`, `yarn` or `pnpm i`
3. Build with `npm run build`, `yarn build` or `pnpm build`
4. Copy `manifest.json`, `main.js` and `styles.css` to a subfolder of your plugins folder (e.g, `<vault>/.obsidian/plugins/<plugin-name>/`)
5. Reload obsidian to see changes

If you clone this repo into `<vault>/.obsidian/plugins/<plugin-name>/` you do not need to copy the files manually and can skip step 4.

**Feel free to open issues and/or contribute to this project!**

## Changelog

### 0.0.4

- Fixed compatibility with new obsidian table editor
- Fixed bug with current line highlight in light themes
- You can now set a different color for the line highlight for dark and light themes

### 0.0.3

- Fixed compatibility with vim mode
- Fixed typewriter dimming on separate window

### 0.0.2

Renamed all settings and commands to use sentence case according to [Obsidian's plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines#Use+sentence+case+in+UI).

### 0.0.1

Initial release of this plugin
