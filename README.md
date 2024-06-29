# Typewriter Mode for Obsidian

Typewriter Mode is a plugin that adds typewriter scrolling (current line stays at a fixed position on the screen), a highlight for the current line, dimming of unfocused paragraphs and more to [Obsidian](https://obsidian.md).
All features can be turned on or off individually and have various settings to customize their behavior to your liking.
Below you can find a list of all features and settings.

_These are a few exemplary screen captures:_
![Typewriter scrolling and current line highlighted](https://github.com/davisriedel/obsidian-typewriter-mode/raw/main/demo/typewriter.gif)
![Unfocused paragraphs dimmed](https://github.com/davisriedel/obsidian-typewriter-mode/raw/main/demo/dimming.gif)

## Compatibility

This plugin is compatible with Obsidian v0.15.0 and above. It does not support the legacy editor.

## Installation

To install community plugins make sure _safe mode_ is turned off in Obsidian's settings.

### From within Obsidian

You can install this plugin within Obsidian by doing the following:

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

**You are welcome to open issues and contribute to this project!**

## Changelog

### 0.0.9

- Completely rewrote the writing focus
    - This fixes:
        - #64 (Fullscreen focus interferes with vim mode)
        - #53 (Typewriter offset wrong in fullscreen mode)
        - #44 (Cannot access command palette from fullscreen)
        - #62 Let dropdown menu appear while writing in typewriter focus mode
    - The new implementation is based on [obsidian-focus-mode](https://github.com/ryanpcmcquen/obsidian-focus-mode) available under the MPL-2.0 license. Therefore, the code in the files `WritingFocus.ts` and `WritingFocus.scss` is available under the same license. The rest of the project remains MIT licensed.

### 0.0.8

- Fix toggling all typewriter mode features on and off
- Fix toggling paragraph dimming and other features

### 0.0.7

- Fixed interference with other plugins that use iframes

### 0.0.6

- Fixed "Only activate after first interaction"
- Fixed bug when using this plugin inside a canvas
- Added setting to disable the plugin in canvas
- Added multiple commands to quickly enable certain features or the whole plugin
- Added update announcement dialog

### 0.0.5

- Fixed a bug where setting changes were not updated unless Obsidian was reopened / force reloaded.

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
