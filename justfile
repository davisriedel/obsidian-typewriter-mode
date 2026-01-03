default:
  just --list


[private]
lint:
  bun biome check --write

[private]
stylelint:
  bun stylelint --fix "src/**/*.scss"

[private]
markdownlint:
  bun markdownlint --disable MD013 --fix "**/*.md"

typecheck:
  bun tsgo --noEmit

check: typecheck lint stylelint markdownlint


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

