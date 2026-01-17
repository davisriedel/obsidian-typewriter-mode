import type TypewriterModeLib from "@/lib";
import EnabledFilePaths from "./enabled-file-paths";
import OnlyActivateAfterFirstInteraction from "./only-activate-after-first-interaction";
import TogglePluginActivation from "./toggle-plugin-activation";

export default function getGeneralFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new TogglePluginActivation(tm),
      new OnlyActivateAfterFirstInteraction(tm),
      new EnabledFilePaths(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
