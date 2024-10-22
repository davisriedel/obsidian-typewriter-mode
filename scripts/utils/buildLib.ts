/// <reference types="bun-types" />

import { $ } from "bun";

import * as sass from "sass-embedded";

import builtins from "builtin-modules";

export async function buildLib(outdir: string) {
	// Build scss
	console.log("Building styles");
	const contents = await sass.compileAsync("src/styles/index.scss", {
		style: "compressed",
	});
	await Bun.write(`${outdir}/styles.css`, contents.css);

	// Build js
	console.log("Building main");
	await Bun.build({
		entrypoints: ["./src/lib.ts"],
		outdir,
		minify: true,
		target: "node",
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

  // Build typescript declaration files
  console.log("Building types")
  await $`bun tsc --noEmit false --emitDeclarationOnly --declaration --outDir ${outdir}/types`;
  await $`bun resolve-tspaths --out ${outdir}/types`
}
