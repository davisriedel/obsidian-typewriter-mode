/// <reference types="bun-types" />

import * as sass from "sass-embedded";

import builtins from "builtin-modules";

export async function buildPlugin(outdir: string) {
	// Build scss
	console.log("Building styles");
	const contents = await sass.compileAsync("src/styles/index.scss", {
		style: "compressed",
	});
	await Bun.write(`${outdir}/styles.css`, contents.css);

	// Build js
	console.log("Building main");
	await Bun.build({
		entrypoints: ["./src/main.ts"],
		outdir,
		minify: true,
		target: "node",
		// @ts-ignore - cjs is experimental and only works on canary build of bun
		format: "cjs",
		external: [
			"obsidian",
			"electron",
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
	});
}
