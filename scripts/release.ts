/// <reference types="bun-types" />

import { $ } from "bun";
import { getPackageMetadata } from "./utils/getPackageMetadata";
import { updateManifests } from "./utils/updateManifests";

console.log("Release script started");

const { targetVersion, minAppVersion } = await getPackageMetadata();

console.log("Checking git status");
const result = await $`git tag -l "${targetVersion}"`.text();
if (result.trim() === targetVersion) {
	console.error(`Version v${targetVersion} is already published. Exiting...`);
	process.exit(1);
}

await updateManifests(targetVersion, minAppVersion);

console.log("Reading changelog");
const changelog = await Bun.file("CHANGELOG.md").text();
if (!changelog.includes(`## ${targetVersion}`)) {
	console.error(`Changelog for v${targetVersion} not found`);
	console.info(
		"Please provide a changelog entry for the new version in CHANGELOG.md",
	);
	process.exit(1);
}

// update versions.json with target version and minAppVersion from manifest.json
console.log("Updating versions.json");
const versions = await Bun.file("versions.json").json();
versions[targetVersion] = minAppVersion;
await Bun.write("versions.json", JSON.stringify(versions, null, 2));

console.log("Committing new version");
await $`git add package.json manifest.json manifest-beta.json versions.json CHANGELOG.md`.quiet();
await $`git commit --no-verify -m "Release v${targetVersion}"`.quiet();

console.log("Tagging new version");
await $`git tag -a "${targetVersion}" -m "${targetVersion}"`.quiet();

console.log("Release script completed");
console.info(
	"Run `git push --follow-tags` to push and release the new version",
);
