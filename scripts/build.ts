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

await build("src", { main: args.lib ? "lib.ts" : "main.ts", styles: "styles/index.scss" }, args.lib ? "lib-dist" : "dist", args.lib ? "esm" : "cjs", true, args.lib);
