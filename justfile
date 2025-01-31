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


[private]
build:
  bun ./scripts/build.ts

dev:
  bun ./scripts/dev.ts

debug:
  bun ./scripts/dev.ts --debug

build-lib:
  bun ./scripts/build.ts --lib


release: check
  bun ./scripts/release.ts

ci: build
  bun ./scripts/generate-ci-artefacts.ts

