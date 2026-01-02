import type TypewriterModeLib from "@/lib";
import DimHighlightListParent from "./dim-highlight-list-parent";
import DimTableAsOne from "./dim-table-as-one";
import DimUnfocused from "./dim-unfocused";
import DimUnfocusedEditorsBehavior from "./dim-unfocused-editors-behavior";
import DimUnfocusedMode from "./dim-unfocused-mode";
import DimmedOpacity from "./dimmed-opacity";
import PauseDimUnfocusedWhileScrolling from "./pause-dim-unfocused-while-scrolling";
import PauseDimUnfocusedWhileSelecting from "./pause-dim-unfocused-while-selecting";

export default function getDimmingFeatures(tm: TypewriterModeLib) {
  return Object.fromEntries(
    [
      new DimUnfocused(tm),
      new DimUnfocusedMode(tm),
      new DimHighlightListParent(tm),
      new DimTableAsOne(tm),
      new DimmedOpacity(tm),
      new PauseDimUnfocusedWhileScrolling(tm),
      new PauseDimUnfocusedWhileSelecting(tm),
      new DimUnfocusedEditorsBehavior(tm),
    ].map((feature) => [feature.getSettingKey(), feature])
  );
}
