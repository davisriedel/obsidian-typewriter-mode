/// <reference types="bun-types" />

import { buildLib } from "./utils/buildLib";

console.log("Building lib");
await buildLib("./lib-dist");
