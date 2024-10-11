/// <reference types="bun-types" />

import { $ } from "bun";

console.log("Release script started");

console.log("Reading package.json");
const pkg = await Bun.file("package.json").json();
const targetVersion = pkg.version;
if (!targetVersion) {
	console.error("Failed to read version from package.json");
	process.exit(1);
}
console.log(`Releasing version v${targetVersion}`);

const isBeta = targetVersion.includes("-");

console.log("Reading manifests");
const manifest = await Bun.file("manifest.json").json();
const manifestBeta = await Bun.file("manifest-beta.json").json();

if (
	manifest.version === targetVersion ||
	manifestBeta.version === targetVersion
) {
	console.log(`Current version v${targetVersion} is already applied`);
	console.info("Please set a new version in package.json to apply it");
	process.exit(0);
}

console.log("Reading changelog");
const changelog = await Bun.file("CHANGELOG.md").text();
if (!changelog.includes(`## ${targetVersion}`)) {
	console.error(`Changelog for v${targetVersion} not found`);
	console.info(
		"Please provide a changelog entry for the new version in CHANGELOG.md",
	);
	process.exit(1);
}

// check if it is release version
if (!isBeta) {
	console.log("Updating manifest.json");
	manifest.version = targetVersion;
	await Bun.write("manifest.json", JSON.stringify(manifest, null, 2));
} else {
	console.log("Skipping manifest.json update for beta version");
}

// bump version of manifest-beta.json to target version
console.log("Updating manifest-beta.json");
manifestBeta.version = targetVersion;
await Bun.write("manifest-beta.json", JSON.stringify(manifestBeta, null, 2));

// update versions.json with target version and minAppVersion from manifest.json
console.log("Updating versions.json");
const versions = await Bun.file("versions.json").json();
versions[targetVersion] = isBeta
	? manifestBeta.minAppVersion
	: manifest.minAppVersion;
await Bun.write("versions.json", JSON.stringify(versions, null, 2));

console.log("Committing new version");
await $`git add package.json manifest.json manifest-beta.json versions.json CHANGELOG.md`.quiet();
await $`git commit -m "Release v${targetVersion}"`.quiet();

console.log("Tagging new version");
await $`git tag -a "${targetVersion}" -m "${targetVersion}"`.quiet();

console.log("Release script completed");
console.info(
	"Run `git push --follow-tags` to push and release the new version",
);
