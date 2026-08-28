/// <reference types="bun-types" />

import { parseArgs } from "node:util";
import { build } from "./common/scripts/build";

const { values: args } = parseArgs({
  allowPositionals: true,
  args: Bun.argv,
  options: {
    lib: {
      type: "boolean",
    },
  },
  strict: true,
});

await build({
  entrypoints: { main: args.lib ? "lib.ts" : "main.ts" },
  format: args.lib ? "esm" : "cjs",
  generateTypes: !!args.lib,
  outDir: args.lib ? "lib-dist" : "dist",
  stripDebug: true,
});
