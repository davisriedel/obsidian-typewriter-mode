import type { App } from "obsidian";
import {
  Component,
  MarkdownRenderer,
  PluginSettingTab,
  SettingGroup,
} from "obsidian";
import type TypewriterModeLib from "@/lib";
import fundingText from "@/texts/Funding.md" with { type: "text" };

export default class TypewriterModeSettingTab extends PluginSettingTab {
  private tm: TypewriterModeLib;

  constructor(app: App, tm: TypewriterModeLib) {
    super(app, tm.plugin);
    this.tm = tm;
  }

  private registerFeaturesInGroup(
    group: SettingGroup,
    features: Record<string, { registerSetting: (group: SettingGroup) => void }>
  ) {
    for (const feature of Object.values(features)) {
      feature.registerSetting(group);
    }
  }

  display(): void {
    this.containerEl.empty();

    // General settings (no heading)
    const generalGroup = new SettingGroup(this.containerEl);
    this.registerFeaturesInGroup(generalGroup, this.tm.features.general);

    // Typewriter group
    const typewriterGroup = new SettingGroup(this.containerEl).setHeading(
      "Typewriter"
    );
    if (
      this.tm.settings.keepLinesAboveAndBelow.isKeepLinesAboveAndBelowEnabled
    ) {
      typewriterGroup.addSetting((setting) =>
        setting.setName(
          'Not available if "keep lines above and below" is activated'
        )
      );
    }
    this.registerFeaturesInGroup(typewriterGroup, this.tm.features.typewriter);

    // Keep lines above and below group
    const keepLinesGroup = new SettingGroup(this.containerEl).setHeading(
      "Keep lines above and below"
    );
    if (this.tm.settings.typewriter.isTypewriterScrollEnabled) {
      keepLinesGroup.addSetting((setting) =>
        setting.setName("Not available if typewriter scrolling is activated")
      );
    }
    this.registerFeaturesInGroup(
      keepLinesGroup,
      this.tm.features.keepAboveAndBelow
    );

    // Highlight current line group
    const currentLineGroup = new SettingGroup(this.containerEl).setHeading(
      "Highlight current line"
    );
    this.registerFeaturesInGroup(
      currentLineGroup,
      this.tm.features.currentLine
    );

    // Dimming group
    const dimmingGroup = new SettingGroup(this.containerEl).setHeading(
      "Dimming"
    );
    this.registerFeaturesInGroup(dimmingGroup, this.tm.features.dimming);

    // Limit line width group
    const maxCharGroup = new SettingGroup(this.containerEl).setHeading(
      "Limit line width"
    );
    this.registerFeaturesInGroup(maxCharGroup, this.tm.features.maxChar);

    // Restore cursor position group
    const restoreCursorGroup = new SettingGroup(this.containerEl).setHeading(
      "Restore cursor position"
    );
    this.registerFeaturesInGroup(
      restoreCursorGroup,
      this.tm.features.restoreCursorPosition
    );

    // Writing focus group
    const writingFocusGroup = new SettingGroup(this.containerEl).setHeading(
      "Writing focus"
    );
    this.registerFeaturesInGroup(
      writingFocusGroup,
      this.tm.features.writingFocus
    );

    // Update notice and funding group
    const updatesGroup = new SettingGroup(this.containerEl).setHeading(
      "Update notice and funding"
    );
    this.registerFeaturesInGroup(updatesGroup, this.tm.features.updates);

    const updateNoticeDiv = this.containerEl.createDiv();
    this.containerEl.appendChild(updateNoticeDiv);
    MarkdownRenderer.render(
      this.app,
      fundingText,
      updateNoticeDiv,
      this.app.vault.getRoot().path,
      new Component()
    );
  }
}
