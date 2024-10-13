import type TypewriterModePlugin from "@/TypewriterModePlugin";
import type Loadable from "./Loadable";

function objectMap<K extends string | number | symbol, V, N>(
	obj: Record<K, V>,
	fn: (v: V, k: K, i: number) => Record<K, N>,
) {
	return Object.fromEntries(
		Object.entries(obj).map(([k, v], i) => [k, fn(v as V, k as K, i)]),
	);
}

export function loadCapabilityGroups<L extends Loadable>(
	plugin: TypewriterModePlugin,
	// biome-ignore lint/suspicious/noExplicitAny: This is a generic function, and the type is not known at compile time
	groups: Record<string, any[]>,
): Record<string, Record<string, L>> {
	return objectMap(groups, (v) => {
		return v.reduce((a, v) => {
			a[v.prototype.constructor.name] = new v(plugin);
			return a;
		}, {});
	});
}
