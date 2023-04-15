import type TypewriterModePlugin from "@/TypewriterModePlugin";

export default abstract class Loadable {
  constructor(protected plugin: TypewriterModePlugin) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  load() {}
}
