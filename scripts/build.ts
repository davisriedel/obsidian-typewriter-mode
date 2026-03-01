/// <reference types="bun-types" />

import { parseArgs } from "node:util";
import { build } from "./common/scripts/build";

const { values: args } = parseArgs({
  args: Bun.argv,
  options: {
    lib: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

await build({
  entrypoints: { main: args.lib ? "lib.ts" : "main.ts" },
  outDir: args.lib ? "lib-dist" : "dist",
  format: args.lib ? "esm" : "cjs",
  stripDebug: true,
  generateTypes: !!args.lib,
});
