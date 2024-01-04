#!/usr/bin/env bash

set -x # echo on

bun ./build.cjs
mkdir -p ./test-vault/.obsidian/plugins/obsidian-typewriter-mode
echo '["typewriter-mode"]' > ./test-vault/.obsidian/community-plugins.json
cp -r dist/* ./test-vault/.obsidian/plugins/obsidian-typewriter-mode

