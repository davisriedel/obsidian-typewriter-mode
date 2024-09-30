# Typewriter Mode for Obsidian

[![](https://img.shields.io/badge/Obsidian-%23483699.svg?style=for-the-badge&logo=obsidian&logoColor=white)](https://obsidian.md/)
[![](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![](https://img.shields.io/badge/Version-0.0.11-blue?style=for-the-badge)](https://github.com/davisriedel/obsidian-typewriter-mode/releases)
[![](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/davis.riedel)
[![](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/davisriedel)

Typewriter Mode is a plugin that adds typewriter scrolling (current line stays at a fixed position on the screen), a highlight for the current line, dimming of unfocused paragraphs and more to [Obsidian](https://obsidian.md).
All features can be turned on or off individually and have various settings to customize their behavior to your liking.

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

The sentence highlighting was derived from [Focus Active Sentence](https://github.com/artisticat1/focus-active-sentence).

The writing focus was derived from [Obsidian Focus Mode](https://github.com/ryanpcmcquen/obsidian-focus-mode).

## Development

The repo depends on the latest [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api).

If you want to contribute to this project or make your own changes, you can do so by following these steps:

1. Clone this repo
2. Install dependencies with `bun install`
3. Build with `bun run build`
4. Create / update test vault with `bun run test-vault`
5. Open the test vault / reload Obsidian to see changes

**You are welcome to open issues and contribute to this project!**

## Support this project

I am studying Computer Science at Karlsruhe Institute of Technology (KIT) in Germany. I develop this plugin in my spare time. If you wish to support me and the continuous development of this plugin, you can donate via GitHub Sponsors or buymeacoffee.com. I am truly thankful for your support.

[![](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/davis.riedel)
[![](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#EA4AAA)](https://github.com/sponsors/davisriedel)

## Changelog

See the `CHANGELOG.md` file.
