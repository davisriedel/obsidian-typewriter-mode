/// <reference types="bun-types" />

import { generateCiArtefacts } from "./common/scripts/generate-ci-artefacts";

await generateCiArtefacts("dist");
