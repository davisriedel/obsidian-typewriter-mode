#!/usr/bin/env node

const { readFileSync, writeFileSync } = require("fs");

const targetVersion = process.env.npm_package_version;

let minAppVersion;

// bump version of manifest-beta.json to target version
let manifestBeta = JSON.parse(readFileSync("manifest-beta.json", "utf8"));
minAppVersion = manifestBeta.minAppVersion;
manifestBeta.version = targetVersion;
writeFileSync("manifest-beta.json", JSON.stringify(manifestBeta, null, "\t"));

// check if it is release version
if (!targetVersion.includes("-")) {
  // read minAppVersion from manifest.json and bump version to target version
  let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
  minAppVersion = manifest.minAppVersion;
  manifest.version = targetVersion;
  writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));
}

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
