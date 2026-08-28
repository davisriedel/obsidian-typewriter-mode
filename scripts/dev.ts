/// <reference types="bun-types" />

import { parseArgs } from "node:util";
import { build } from "./common/scripts/build";
import { setupTestVault } from "./common/scripts/setup-test-vault";

const { values: args } = parseArgs({
  allowPositionals: true,
  args: Bun.argv,
  options: {
    debug: {
      type: "boolean",
    },
  },
  strict: true,
});

await build({ stripDebug: args.debug });

await setupTestVault("./dist", "obsidian-typewriter-mode", "./test-vault");
