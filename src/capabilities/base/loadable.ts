import type TypewriterModeLib from "@/lib";

export default abstract class Loadable {
  protected tm: TypewriterModeLib;

  constructor(tm: TypewriterModeLib) {
    this.tm = tm;
  }

  load() {
    // Hook for loading - override in subclass if needed
  }
}
