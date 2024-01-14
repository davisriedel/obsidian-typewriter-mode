/// <reference types="bun-types" />

import type { BunPlugin } from "bun";

import fs from "node:fs";

const outdir = "./dist";

// Bun plugin for compiling scss
const scss: BunPlugin = {
	name: "Sass Loader",
	async setup(build) {
		const sass = await import("sass");

		build.onLoad({ filter: /\.scss$/ }, ({ path }) => {
			const contents = sass.compile(path);
			Bun.write(`${outdir}/styles.css`, contents.css);
			return {};
		});
	},
};

// create dist folder
if (!fs.existsSync(outdir)) fs.mkdirSync(outdir);

// Build scss
await Bun.build({
	entrypoints: ["./src/styles.scss"],
	outdir,
	plugins: [scss],
});

// Build js
await Bun.build({
	entrypoints: ["./src/main.ts"],
	outdir,
	minify: true,
	target: "node",
	format: "cjs", // currently, only esm is supported, thus bun.build does not work with obsidian!
	external: ["obsidian"],
});

// Copy manifest to dist folder
fs.copyFileSync("./manifest.json", "./dist/manifest.json");
