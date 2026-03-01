/// <reference types="bun-types" />

import { parseArgs } from "node:util";
import { build } from "./common/scripts/build";
import { setupTestVault } from "./common/scripts/setup-test-vault";

const { values: args } = parseArgs({
  args: Bun.argv,
  options: {
    debug: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

await build({ stripDebug: args.debug });

await setupTestVault("./dist", "obsidian-typewriter-mode", "./test-vault");
