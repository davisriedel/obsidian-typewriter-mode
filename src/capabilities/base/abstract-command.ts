import Loadable from "./loadable";

export abstract class AbstractCommand extends Loadable {
  abstract readonly commandKey: string;
  abstract readonly commandTitle: string;

  protected abstract registerCommand(): void;
}
