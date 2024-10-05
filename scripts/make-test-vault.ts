/// <reference types="bun-types" />

import { $ } from "bun";

if (
	(await Bun.file("dist/main.js").exists()) &&
	(await Bun.file("dist/styles.css").exists()) &&
	(await Bun.file("dist/manifest.json").exists())
) {
	console.log("Build exists. Continuing...");

	console.log("Creating test vault.");
	await $`mkdir -p ./test-vault/.obsidian/plugins/obsidian-typewriter-mode`.quiet();

	if (
		!(await Bun.file("./test-vault/.obsidian/community-plugins.json").exists())
	) {
		console.log("Creating community-plugins.json");
		await Bun.write(
			"./test-vault/.obsidian/community-plugins.json",
			'["typewriter-mode"]',
		);
	}

	console.log("Copying build to test vault.");
	await $`cp -r dist/* ./test-vault/.obsidian/plugins/obsidian-typewriter-mode`.quiet();

	console.log("Test vault successfully prepared.");
} else {
	console.error("Build the plugin first before creating a test vault.");
	process.exit(1);
}
