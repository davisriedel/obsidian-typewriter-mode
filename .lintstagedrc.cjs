module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "bunx @biomejs/biome check --apply",
    () => "bun tsc --noEmit",
  ],
  "*.{json}": "bunx @biomejs/biome check --apply",
};

