import type TypewriterModeLib from "@/lib";

export default abstract class Loadable {
	constructor(protected tm: TypewriterModeLib) {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	load() {}
}
