# Development

**You are welcome to open issues and contribute to this project!**

## Prerequisites

1. Install the `canary` version of `Bun` on your system: <https://bun.sh/>
2. Install `Just` command runner: <https://just.systems/man/en/>

## Setup

1. Fork this repo and clone your fork
2. Install dependencies with `bun install`

## Building and Testing

1. Build and Setup Test Vault
   - Build with `just build`
   - Create / update test vault with `just test-vault`
   - Use `just dev` to build and update test vault in one step

2. Test in Obsidian
   - Open the test vault in Obsidian
   - If the test vault is already opened, _force reload_ Obsidian to see changes
