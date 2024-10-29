import Loadable from "./Loadable";

export abstract class AbstractCommand extends Loadable {
	public abstract readonly commandKey: string;
	public abstract readonly commandTitle: string;

	protected abstract registerCommand(): void;
}
