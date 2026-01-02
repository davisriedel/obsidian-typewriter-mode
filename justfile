default:
  just --list


[private]
lint:
  bun biome check --write ./src ./scripts

[private]
stylelint:
  bun stylelint --fix "src/**/*.scss"

[private]
markdownlint:
  bun markdownlint --disable MD013 --fix "**/*.md"

typecheck:
  bun tsgo --noEmit

check: typecheck lint stylelint markdownlint


dev:
  bun ./scripts/dev.ts

debug:
  bun ./scripts/dev.ts --debug


lib:
  bun ./scripts/lib.ts


release: check
  bun ./scripts/release.ts

ci:
  bun ./scripts/ci.ts

