module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "bunx @biomejs/biome check --write",
    () => "bun tsc --noEmit",
  ],
  "*.json": "bunx @biomejs/biome check --write",
  "*.scss": "bunx stylelint --fix",
  "*.md": "bun markdownlint --disable MD013 --fix"
};

