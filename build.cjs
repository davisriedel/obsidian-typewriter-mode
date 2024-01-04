#!/usr/bin/env node

const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { sassPlugin } = require("esbuild-sass-plugin");
const fs = require("fs");

require("esbuild")
  .build({
    entryPoints: ["./src/main.ts", "./src/styles.scss"],
    outdir: "./dist",
    bundle: true,
    minify: true,
    platform: "node",
    sourcemap: false,
    target: "node14",
    plugins: [nodeExternalsPlugin(), sassPlugin()],
  })
  .catch(() => process.exit(1))
  .finally(() => {
    fs.copyFileSync("./manifest.json", "./dist/manifest.json");
  });
