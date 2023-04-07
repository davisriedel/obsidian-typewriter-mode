# Typewriter Mode for Obsidian

A plugin for [Obsidian](https://obsidian.md) to enable typewriter-style scrolling, which keeps the active line at a fixed position.

**This plugin is currently in BETA.** _Please feel free to open an issue if you find any bugs._

## Installation

To install community plugins make sure `safe mode` is turned off in Obsidian's settings.

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

- Download the latest Release from the Releases section of the GitHub Repository
- Extract the plugin folder from the zip to your vault's plugins folder: `<vault>/.obsidian/plugins/`  
  Note: On some machines the `.obsidian` folder may be hidden. On macOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.
- Reload Obsidian

#### With BRAT

Follow the instructions in the repository of the [BRAT plugin](https://github.com/TfTHacker/obsidian42-brat#Quick-Guide-for-using-BRAT) and use this repository's URL: `https://github.com/davisriedel/obsidian-typewriter-mode` to install the plugin.

## Compatibility

Custom plugins are only available for Obsidian v0.9.7+.

## Derived from

This plugin started as a fork of the incredible [Typewriter Scroll](https://github.com/deathau/cm-typewriter-scroll-obsidian) plugin by [deathau](https://github.com/deathau). It was turned into a separate plugin because the code and tooling was restructured quite a lot and several breaking changes were introduced.
The plugin also contains code adapted from [this repository](https://github.com/azu/codemirror-typewriter-scrolling/blob/b0ac076d72c9445c96182de87d974de2e8cc56e2/typewriter-scrolling.js).

## Development

The repo depends on the latest [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api).

If you want to contribute to development and/or just customize it with your own
tweaks, you can do the following:

1. Clone this repo
2. Install dependencies with `npm i`, `yarn` or `pnpm i`
3. `npm run build`, `yarn build` or `pnpm build` to compile
4. Copy `manifest.json`, `main.js` and `styles.css` to a subfolder of your plugins folder (e.g, `<vault>/.obsidian/plugins/<plugin-name>/`)
5. Reload obsidian to see changes

If you clone this repo into `<vault>/.obsidian/plugins/<plugin-name>/` you do not need to copy the files manually and can skip step 4.

**Feel free to open issues or contribute to this project!**
