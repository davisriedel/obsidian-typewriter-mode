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


dev:
  bun ./scripts/dev.ts


prerelease: check type-check

release: prerelease
  bun ./scripts/release.ts

ci:
  bun ./scripts/ci.ts

