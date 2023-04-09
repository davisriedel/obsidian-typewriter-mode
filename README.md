# Typewriter Mode for Obsidian

**This plugin is currently in BETA.** _Please feel free to open an issue if you find any bugs._

## Features
- **Typewriter scrolling:** While writing, the cursor will stay at a fixed percentage of the screen
- **Highlight typewriter line:** The typewriter line to which the cursor is fixed can be highlighted
- **Limit maximum number of characters per line**
- **Dim unfocused paragraphs**: All paragraphs but the one containing the cursor will be dimmed
- **Fullscreen writing focus**: Opens the editor in fullscreen, hiding everything but the text

*Each of those features have several settings that allow you to customize them to your needs.*

## Compatibility

This plugin is compatible with Obsidian v0.15.0 and above. It does not support the legacy editor.

## Installation

To install community plugins make sure *safe mode* is turned off in Obsidian's settings.

### From within Obsidian

**Since this plugin is in BETA it is not yet published to Obsidian. Please install it from GitHub as described below.**

<!---
You can activate this plugin within Obsidian by doing the following:

- Go to Settings > Community Plugins > Browse
- Search for "Typewriter Mode"
- Click Install
- Click Enable
--->

### From GitHub

#### Manual

1. Download the latest Release from the Releases section of the GitHub Repository
2. Extract the plugin folder from the zip to your vault's plugins folder: `<vault>/.obsidian/plugins/`. *Note: On some machines the `.obsidian` folder may be hidden. On macOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.*
3. Reload Obsidian

#### With BRAT

Follow the instructions in the repository of the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat#Quick-Guide-for-using-BRAT) and use this repository's URL: `https://github.com/davisriedel/obsidian-typewriter-mode` to install the plugin.

## Derived from

This plugin started as a fork of the incredible [Typewriter Scroll](https://github.com/deathau/cm-typewriter-scroll-obsidian) plugin by [deathau](https://github.com/deathau). It was turned into a separate plugin because many new features were added, breaking changes were introduced, and the code was completely restructured to make it more extensible.

## Development

The repo depends on the latest [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api).

If you want to contribute to development and/or just customize it with your own
tweaks, you can do the following:

1. Clone this repo
2. Install dependencies with `npm i`, `yarn` or `pnpm i`
3. Build with `npm run build`, `yarn build` or `pnpm build`
4. Copy `manifest.json`, `main.js` and `styles.css` to a subfolder of your plugins folder (e.g, `<vault>/.obsidian/plugins/<plugin-name>/`)
5. Reload obsidian to see changes

If you clone this repo into `<vault>/.obsidian/plugins/<plugin-name>/` you do not need to copy the files manually and can skip step 4.

**Feel free to open issues or contribute to this project!**
