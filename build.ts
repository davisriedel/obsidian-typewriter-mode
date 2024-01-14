import fs from "fs";
import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import { sassPlugin } from "esbuild-sass-plugin";

esbuild
	.build({
		entryPoints: ["./src/main.ts", "./src/styles.scss"],
		outdir: "./dist",
		bundle: true,
		minify: true,
		platform: "node",
		sourcemap: false,
		target: "node14",
		plugins: [nodeExternalsPlugin(), sassPlugin()],
	})
	.catch(() => process.exit(1))
	.finally(() => {
		fs.copyFileSync("./manifest.json", "./dist/manifest.json");
	});
