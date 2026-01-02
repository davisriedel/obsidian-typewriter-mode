/// <reference types="bun-types" />

import { generateCiArtefacts } from "./common/scripts/generateCiArtefacts";

await generateCiArtefacts("dist");
