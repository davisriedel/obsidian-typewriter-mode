/// <reference types="bun-types" />

import { stripDebug as stripDebugPlugin } from "@namchee/bun-plugin-strip-debug";
import builtins from "builtin-modules";
import { $ } from "bun";
import * as sass from "sass-embedded";

async function build(
	entrypoint: string,
	format: "cjs" | "esm",
	stripDebug: boolean,
	outdir: string,
) {
	// Build scss
	console.log("Building styles");
	const contents = await sass.compileAsync("src/styles/index.scss", {
		style: "compressed",
	});
	await Bun.write(`${outdir}/styles.css`, contents.css);

	// Build js
	console.log("Building main");
	await Bun.build({
		entrypoints: [entrypoint],
		outdir,
		minify: true,
		target: "browser",
		// @ts-ignore - cjs is experimental and only works on canary build of bun
		format,
		plugins: stripDebug ? [stripDebugPlugin()] : [],
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
	});
}

export async function buildPlugin(outdir: string, stripDebug = true) {
	await build("./src/main.ts", "cjs", stripDebug, outdir);
}

export async function buildLib(outdir: string) {
	await build("./src/lib.ts", "esm", true, outdir);

	// Build typescript declaration files
	console.log("Building types");
	await $`bun tsc --noEmit false --emitDeclarationOnly --declaration --outDir ${outdir}/types`;
	await $`bun resolve-tspaths --out ${outdir}/types`;
}
