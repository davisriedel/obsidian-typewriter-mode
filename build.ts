import fs from "fs";
import builtins from "builtin-modules";
import esbuild from "esbuild";
// import { nodeExternalsPlugin } from "esbuild-node-externals";
import { sassPlugin } from "esbuild-sass-plugin";

esbuild
	.build({
		entryPoints: ["./src/main.ts", "./src/styles.scss"],
		outdir: "./dist",
		bundle: true,
		minify: true,
		platform: "node",
		sourcemap: false,
		target: "node14",
		external: [
			"obsidian",
			"electron",
			"@electron/remote",
			"@codemirror/autocomplete",
			"@codemirror/collab",
			"@codemirror/commands",
			"@codemirror/language",
			"@codemirror/lint",
			"@codemirror/search",
			"@codemirror/state",
			"@codemirror/view",
			"@lezer/common",
			"@lezer/highlight",
			"@lezer/lr",
			...builtins,
		],
		plugins: [sassPlugin()],
	})
	.catch(() => process.exit(1))
	.finally(() => {
		fs.copyFileSync("./manifest.json", "./dist/manifest.json");
	});
