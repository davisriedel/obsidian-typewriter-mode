module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "bunx @biomejs/biome check --apply",
    () => "bun tsc --noEmit",
  ],
  "*.{json,scss,css,md}": "bunx @biomejs/biome check --apply",
};

