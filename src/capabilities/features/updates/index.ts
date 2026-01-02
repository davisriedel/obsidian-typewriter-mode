import type TypewriterModeLib from "@/lib";
import AnnounceUpdates from "./announce-updates";

export default function getUpdateFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [new AnnounceUpdates(tm)].map((feature) => [
      feature.getSettingKey(),
      feature,
    ])
  );
}
