/// <reference types="bun-types" />

import { $ } from "bun";

import * as sass from "sass-embedded";

import builtins from "builtin-modules";
import { getPackageMetadata } from "./utils/getPackageMetadata";
import { updateManifests } from "./utils/updateManifests";

const outdir = "./dist";

console.log("Build script started");

// clean and remake dist folder
console.log("Cleaning dist folder");
await $`rm -rf ${outdir}`.quiet();
await $`mkdir -p ${outdir}`.quiet();

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

console.log("Updating manifests");
const { targetVersion, minAppVersion } = await getPackageMetadata();
const { isBeta } = await updateManifests(targetVersion, minAppVersion, outdir);

console.log("Selecting manifest");
if (isBeta) {
	await $`mv ${outdir}/manifest-beta.json ${outdir}/manifest.json`.quiet();
} else {
	await $`rm ${outdir}/manifest-beta.json`.quiet();
}

console.info("Build script completed");
