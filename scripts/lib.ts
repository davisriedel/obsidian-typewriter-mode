/// <reference types="bun-types" />

import { buildLib } from "./utils/build";

console.log("Building lib");
await buildLib("./lib-dist");
