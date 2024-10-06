/// <reference types="bun-types" />

const pkg = await Bun.file("package.json").json();
const targetVersion = pkg.version;
if (!targetVersion) process.exit(1);
console.log("Bumping version to", targetVersion);

// bump version of manifest-beta.json to target version
console.log("Updating manifest-beta.json");
const manifestBeta = await Bun.file("manifest-beta.json").json();
let minAppVersion = manifestBeta.minAppVersion;
manifestBeta.version = targetVersion;
await Bun.write("manifest-beta.json", JSON.stringify(manifestBeta, null, 2));

// check if it is release version
if (!targetVersion.includes("-")) {
	console.log("Updating manifest.json");
	// read minAppVersion from manifest.json and bump version to target version
	const manifest = await Bun.file("manifest.json").json();
	minAppVersion = manifest.minAppVersion;
	manifest.version = targetVersion;
	await Bun.write("manifest.json", JSON.stringify(manifest, null, 2));
} else {
	console.log("Skipping manifest.json update for beta version");
}

// update versions.json with target version and minAppVersion from manifest.json
console.log("Updating versions.json");
const versions = await Bun.file("versions.json").json();
versions[targetVersion] = minAppVersion;
await Bun.write("versions.json", JSON.stringify(versions, null, 2));

console.log("Version bump complete.");
