import { $, file } from "bun";
import { exit } from "process";

const buildExists = await ["main.js", "styles.css", "manifest.json"].reduce(
	async (acc, filename) => (await file(`./dist/${filename}`).exists()) && acc,
	Promise.resolve(true),
);
if (!buildExists) {
	await $`echo "No build found."`;
	exit(1);
}

const testVaultPluginPath =
	"./test-vault/.obsidian/plugins/obsidian-typewriter-mode";
await $`echo "Creating test vault."`;
await $`mkdir -p ${testVaultPluginPath}`;

if (!(await file("./test-vault/.obsidian/community-plugins.json").exists())) {
	await $`echo '["typewriter-mode"]' > ./test-vault/.obsidian/community-plugins.json`;
}

await $`echo "Copying build to test vault."`;
await $`cp -r dist/* ${testVaultPluginPath}`;

await $`echo "Test vault successfully prepared."`;
