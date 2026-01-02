/// <reference types="bun-types" />

import { parseArgs } from "node:util";
import { $ } from "bun";

import { buildPlugin } from "./utils/build";
import { getPackageMetadata } from "./utils/get-package-metadata";
import { updateManifests } from "./utils/update-manifests";

const obsidianConfigPath = "./test-vault/.obsidian";
const pluginPath = `${obsidianConfigPath}/plugins/obsidian-typewriter-mode`;

const { values: args } = parseArgs({
  args: Bun.argv,
  options: {
    debug: {
      type: "boolean",
    },
  },
  strict: true,
  allowPositionals: true,
});

console.log("Creating test vault");
await $`mkdir -p ${pluginPath}`.quiet();

if (await Bun.file(`${obsidianConfigPath}/community-plugins.json`).exists()) {
  console.log("Community plugins already configured in test vault");
} else {
  console.log("Creating community-plugins.json");
  await Bun.write(
    `${obsidianConfigPath}/community-plugins.json`,
    '["typewriter-mode"]'
  );
}

console.log("Cleaning test vault");
await $`rm ${pluginPath}/main.js ${pluginPath}/styles.css ${pluginPath}/manifest.json`.quiet();

console.log("Building plugin");
const isDebugMode = args.debug ?? false;
await buildPlugin(pluginPath, !isDebugMode);

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
