/// <reference types="bun-types" />

import builtins from "builtin-modules";
import { $ } from "bun";

async function build(
	entrypoint: string,
	format: "cjs" | "esm",
	stripDebug: boolean,
	outdir: string,
) {
	// Build scss
	console.log("Building styles");
	await $`mkdir -p ${outdir}`;
	await $`grass src/styles/index.scss --style compressed > ${Bun.file(`${outdir}/styles.css`)}`;

	// Build js
	console.log("Building main");
	await Bun.build({
		entrypoints: [entrypoint],
		outdir,
		minify: true,
		target: "browser",
		format,
		drop: stripDebug ? ["console"] : [],
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
