declare module "font-measure" {
	export interface FontMeasureOptions {
		fontSize: number;
		origin: "top" | "bottom";
	}
	export interface FontMeasureMetrics {
		top: number;
		median: number;
		middle: number;
		bottom: number;
		alphabetic: number;
		baseline: number;
		upper: number;
		lower: number;
		capHeight: number;
		xHeight: number;
		ascent: number;
		descent: number;
		hanging: number;
		ideographic: number;
		lineHeight: number;
		overshoot: number;
		tittle: number;
	}
	export default function measure(
		fontFamily: string,
		options: FontMeasureOptions,
	): FontMeasureMetrics;
}
