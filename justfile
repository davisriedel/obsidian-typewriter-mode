default:
  just --list


lint:
  bun biome check --write

lint-styles:
  bun stylelint --fix "src/**/*.scss"

lint-md:
  rumdl check --fix .

typecheck:
  bun tsgo --noEmit

check: typecheck lint lint-styles lint-md


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

