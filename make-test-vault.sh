#!/usr/bin/env bash

[[ -f ./dist/main.js && -f ./dist/styles.css && -f ./dist/manifest.json ]] || { echo "No build found."; exit 1; };

echo "Creating test vault.";
mkdir -p ./test-vault/.obsidian/plugins/obsidian-typewriter-mode;
[[ -f ./test-vault/.obsidian/community-plugins.json ]] || { echo '["typewriter-mode"]' > ./test-vault/.obsidian/community-plugins.json; };

echo "Copying build to test vault.";
cp -r dist/* ./test-vault/.obsidian/plugins/obsidian-typewriter-mode;

echo "Test vault successfully prepared.";

