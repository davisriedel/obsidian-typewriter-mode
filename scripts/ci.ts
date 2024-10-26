/// <reference types="bun-types" />

import { $ } from "bun";

import { buildPlugin } from "./utils/build";
import { getPackageMetadata } from "./utils/getPackageMetadata";

const outdir = "dist";

console.log("Building plugin");
await buildPlugin(outdir);

console.log("Copying updated manifest");
const { targetVersion, isBeta } = await getPackageMetadata();
if (isBeta) {
	await $`cp manifest-beta.json ${outdir}/manifest.json`.quiet();
} else {
	await $`cp manifest.json ${outdir}/manifest.json`.quiet();
}

console.log("Extracting release notes from change log");
const changelog = await Bun.file("CHANGELOG.md").text();
const pattern = `^## ${targetVersion}\\n+((?:([^#]{2})|\\n)+)`;
const regex = RegExp(pattern, "gm");
const matches = regex.exec(changelog);
const release_notes = matches?.at(1);
if (!release_notes) console.warn("Release notes not found in changelog");

console.log("Writing release notes");
await Bun.write(`${outdir}/release-notes.md`, release_notes ?? "");
