/// <reference types="bun-types" />

import { $ } from "bun";

import path from "node:path";
import type { BunPlugin } from "bun";

import builtins from "builtin-modules";

const outdir = "./dist";

// Bun plugin for compiling scss
const scss: BunPlugin = {
	name: "Sass Loader",
	async setup(build) {
		const sass = await import("sass");

		build.onLoad({ filter: /\.scss$/ }, (args) => {
			const contents = sass.compile(args.path);
			const filename = path.parse(args.path).name;
			Bun.write(`${outdir}/${filename}.css`, contents.css);

			// Do nothing... File is already written.
			return {
				loader: "object",
				exports: {},
			};
		});
	},
};

// clean and remake dist folder
console.log("Cleaning dist folder...");
await $`rm -rf ${outdir}`.quiet();
await $`mkdir -p ${outdir}`.quiet();

// Build scss
console.log("Building styles...");
await Bun.build({
	entrypoints: ["./src/styles.scss"],
	outdir,
	plugins: [scss],
});

// Build js
console.log("Building main...");
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

// Copy manifest to dist folder
console.log("Copying manifest...");
await $`cp manifest.json ${outdir}/manifest.json`.quiet();
