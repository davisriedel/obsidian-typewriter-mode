/// <reference types="bun-types" />

import { $ } from "bun";

import { buildPlugin } from "./utils/buildPlugin";
import { getPackageMetadata } from "./utils/getPackageMetadata";
import { updateManifests } from "./utils/updateManifests";

const obsidianConfigPath = "./test-vault/.obsidian";
const pluginPath = `${obsidianConfigPath}/plugins/obsidian-typewriter-mode`;

console.log("Creating test vault");
await $`mkdir -p ${pluginPath}`.quiet();

if (
	!(await Bun.file(`${obsidianConfigPath}/community-plugins.json`).exists())
) {
	console.log("Creating community-plugins.json");
	await Bun.write(
		`${obsidianConfigPath}/community-plugins.json`,
		'["typewriter-mode"]',
	);
} else {
	console.log("Community plugins already configured in test vault");
}

console.log("Cleaning test vault");
await $`rm ${pluginPath}/main.js ${pluginPath}/styles.css ${pluginPath}/manifest.json`.quiet();

console.log("Building plugin");
await buildPlugin(pluginPath);

console.log("Copying updated manifests");
const { targetVersion, minAppVersion, isBeta } = await getPackageMetadata();
await updateManifests(targetVersion, minAppVersion, pluginPath);

console.log("Selecting manifest");
if (isBeta) {
	await $`mv ${pluginPath}/manifest-beta.json ${pluginPath}/manifest.json`.quiet();
} else {
	await $`rm ${pluginPath}/manifest-beta.json`.quiet();
}

console.log("Test vault successfully prepared");
