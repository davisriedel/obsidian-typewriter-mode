default:
  just --list


[private]
biome ARG:
  bunx @biomejs/biome {{ARG}} --write ./src ./scripts

format:
  just biome format

lint:
  just biome lint

check:
  just biome check


type-check:
  bun tsc --noEmit


build:
  bun ./scripts/build.ts

clean:
  bun exec "rm -rf ./dist"


test-vault: 
  bun ./scripts/make-test-vault.ts

clean-test-vault: 
  bun exec "rm -rf ./test-vault/.obsidian/plugins/obsidian-typewriter-mode"


dev: build test-vault


prerelease: check type-check build

release: prerelease
  bun ./scripts/release.ts

