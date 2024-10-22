default:
  just --list


[private]
biome:
  bun biome check --write ./src ./scripts

[private]
stylelint:
  bun stylelint --fix "src/**/*.scss"

[private]
markdownlint:
  bun markdownlint --disable MD013 --fix "**/*.md"

tsc:
  bun tsc --noEmit

check: tsc biome stylelint markdownlint


dev:
  bun ./scripts/dev.ts


lib:
  bun ./scripts/lib.ts


release: check
  bun ./scripts/release.ts

ci:
  bun ./scripts/ci.ts

