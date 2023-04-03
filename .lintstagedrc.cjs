module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    () => "tsc --noEmit",
  ],
  "*.{json,scss,css,md}": "prettier --write",
};
