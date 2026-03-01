default:
  just --list


lint:
  bun biome check --write

lint-styles:
  bun stylelint --fix "src/**/*.scss"

lint-md:
  bun rumdl check --fix .

typecheck:
  bun tsgo --noEmit

check: typecheck lint lint-styles lint-md


build:
  bun ./scripts/build.ts

build-lib:
  bun ./scripts/build.ts --lib

dev:
  bun ./scripts/dev.ts

debug:
  bun ./scripts/dev.ts --debug


release: check
  bun ./scripts/release.ts

ci: build
  bun ./scripts/generate-ci-artefacts.ts

