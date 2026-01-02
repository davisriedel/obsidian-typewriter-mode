import type TypewriterModeLib from "@/lib";
import LimitMaxCharsPerLine from "./limit-max-chars-per-line";
import MaxCharsPerLine from "./max-chars-per-line";

export default function getMaxCharFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [new LimitMaxCharsPerLine(tm), new MaxCharsPerLine(tm)].map((feature) => [
      feature.getSettingKey(),
      feature,
    ])
  );
}
