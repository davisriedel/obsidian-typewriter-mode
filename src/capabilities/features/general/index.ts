import type TypewriterModeLib from "@/lib";
import EnabledPlatforms from "./enabled-platforms";
import OnlyActivateAfterFirstInteraction from "./only-activate-after-first-interaction";
import TogglePluginActivation from "./toggle-plugin-activation";

export default function getGeneralFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new TogglePluginActivation(tm),
      new EnabledPlatforms(tm),
      new OnlyActivateAfterFirstInteraction(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
