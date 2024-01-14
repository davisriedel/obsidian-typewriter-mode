/// <reference types="bun-types" />

import { readFileSync, writeFileSync } from "node:fs";

const targetVersion = process.env.npm_package_version;
if (!targetVersion) process.exit(1);

let minAppVersion: string;

// bump version of manifest-beta.json to target version
const manifestBeta = JSON.parse(readFileSync("manifest-beta.json", "utf8"));
minAppVersion = manifestBeta.minAppVersion;
manifestBeta.version = targetVersion;
writeFileSync("manifest-beta.json", JSON.stringify(manifestBeta, null, "\t"));

// check if it is release version
if (!targetVersion.includes("-")) {
	// read minAppVersion from manifest.json and bump version to target version
	const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
	minAppVersion = manifest.minAppVersion;
	manifest.version = targetVersion;
	writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));
}

// update versions.json with target version and minAppVersion from manifest.json
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
