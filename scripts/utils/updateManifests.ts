/// <reference types="bun-types" />

export async function updateManifests(
	targetVersion: string,
	minAppVersion: string,
	outdir = ".",
) {
	console.log("Reading manifests");
	const manifest = await Bun.file("manifest.json").json();
	const manifestBeta = await Bun.file("manifest-beta.json").json();

	// check if it is release version
	const isBeta = targetVersion.includes("-");
	if (!isBeta) {
		const manifestOutPath = `${outdir}/manifest.json`;
		console.log(`Updating ${manifestOutPath}`);
		manifest.version = targetVersion;
		manifest.minAppVersion = minAppVersion;
		await Bun.write(manifestOutPath, JSON.stringify(manifest, null, 2));
	} else {
		console.log("Skipping manifest.json update for beta version");
	}

	// bump version of manifest-beta.json to target version
	const betaOutPath = `${outdir}/manifest-beta.json`;
	console.log(`Updating ${betaOutPath}`);
	manifestBeta.version = targetVersion;
	manifestBeta.minAppVersion = minAppVersion;
	await Bun.write(betaOutPath, JSON.stringify(manifestBeta, null, 2));

	return { targetVersion, minAppVersion };
}
