import { Facet } from "@codemirror/state";

export type PerWindowProps = {
	cssVariables: Record<string, string>;
	bodyAttrs: Record<string, string>;
	bodyClasses: string[];
};

export const perWindowProps = Facet.define<PerWindowProps, PerWindowProps>({
	combine: (values) => {
		if (values.length === 0) {
			return {
				cssVariables: {},
				bodyAttrs: {},
				bodyClasses: [],
			};
		}
		return values[values.length - 1];
	},
});
