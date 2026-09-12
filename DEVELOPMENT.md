# Development

**You are welcome to open issues and contribute to this project!**

## Prerequisites

1. Install `Bun`: <https://bun.sh/>
2. Install `mise`: <https://mise.jdx.dev/getting-started.html>

## Setup

1. Fork this repo and clone your fork
2. Initialize the build-scripts submodule: `git submodule update --init`
3. Install development tools with `mise install`
4. Install dependencies with `bun install`

## Building and Testing

1. Build and Setup Test Vault
   - Build with `mise run build`
   - Use `mise run dev` to build and update the test vault
   - Use `mise run debug` to print `console.debug` statements _(all other commands strip these)_

2. Test in Obsidian
   - Open the test vault in Obsidian
   - If the test vault is already opened, _force reload_ Obsidian to see changes
