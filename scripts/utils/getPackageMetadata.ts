/// <reference types="bun-types" />

export async function getPackageMetadata() {
	console.log("Reading package.json");
	const pkg = await Bun.file("package.json").json();
	const targetVersion = pkg.version;
	const minAppVersion = pkg.obsidianMinAppVersion;
	const isBeta = targetVersion.includes("-");
	return { targetVersion, minAppVersion, isBeta };
}
