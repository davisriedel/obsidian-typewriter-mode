/// <reference types="bun-types" />

import { $ } from "bun";

console.log("Preparing test vault");

const distPath = "./dist";
const obsidianConfigPath = "./test-vault/.obsidian";
const pluginPath = `${obsidianConfigPath}/plugins/obsidian-typewriter-mode`;

if (
	(await Bun.file(`${distPath}/main.js`).exists()) &&
	(await Bun.file(`${distPath}/styles.css`).exists())
) {
	console.log("Build exists. Continuing...");

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

	console.log("Copying build to test vault");
	await $`cp -r dist/* ${pluginPath}`.quiet();

	console.log("Test vault successfully prepared");
} else {
	console.error("Build the plugin first before creating a test vault");
	process.exit(1);
}
