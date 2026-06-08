import type { App, SettingDefinition, SettingDefinitionItem } from "obsidian";
import {
  Component,
  MarkdownRenderer,
  PluginSettingTab,
  SettingGroup,
} from "obsidian";
import type TypewriterModeLib from "@/lib";
import fundingText from "@/texts/Funding.md" with { type: "text" };

export default class TypewriterModeSettingTab extends PluginSettingTab {
  override icon = "type-outline";

  private readonly tm: TypewriterModeLib;

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

  private featureDefs(
    features: Record<
      string,
      { getDefinition: (cb?: () => void) => SettingDefinition }
    >,
    onChanged: () => void
  ): SettingDefinition[] {
    return Object.values(features).map((f) => f.getDefinition(onChanged));
  }

  override getSettingDefinitions(): SettingDefinitionItem[] {
    const refresh = () => this.refreshDomState();

    return [
      // General — no heading
      ...this.featureDefs(this.tm.features.general, refresh),

      // Typewriter
      {
        type: "group",
        heading: "Typewriter",
        items: [
          {
            name: 'Not available if "keep lines above and below" is activated',
            visible: () =>
              this.tm.settings.keepLinesAboveAndBelow
                .isKeepLinesAboveAndBelowEnabled,
          },
          ...this.featureDefs(this.tm.features.typewriter, refresh),
        ],
      },

      // Keep lines above and below
      {
        type: "group",
        heading: "Keep lines above and below",
        items: [
          {
            name: "Not available if typewriter scrolling is activated",
            visible: () =>
              this.tm.settings.typewriter.isTypewriterScrollEnabled,
          },
          ...this.featureDefs(this.tm.features.keepAboveAndBelow, refresh),
        ],
      },

      // Highlight current line
      {
        type: "group",
        heading: "Highlight current line",
        items: this.featureDefs(this.tm.features.currentLine, refresh),
      },

      // Limit line width
      {
        type: "group",
        heading: "Limit line width",
        items: this.featureDefs(this.tm.features.maxChar, refresh),
      },

      // Dimming
      {
        type: "group",
        heading: "Dimming",
        items: this.featureDefs(this.tm.features.dimming, refresh),
      },

      // Writing focus
      {
        type: "group",
        heading: "Writing focus",
        items: this.featureDefs(this.tm.features.writingFocus, refresh),
      },

      // Hemingway mode
      {
        type: "group",
        heading: "Hemingway mode",
        items: this.featureDefs(this.tm.features.hemingwayMode, refresh),
      },

      // Restore cursor position
      {
        type: "group",
        heading: "Restore cursor position",
        items: this.featureDefs(
          this.tm.features.restoreCursorPosition,
          refresh
        ),
      },

      // Update notice and funding
      {
        type: "group",
        heading: "Update notice and funding",
        items: [
          ...this.featureDefs(this.tm.features.updates, refresh),
          {
            name: "",
            render: (setting) => {
              setting.settingEl.empty();
              const div = setting.settingEl.createDiv();
              MarkdownRenderer.render(
                this.app,
                fundingText,
                div,
                this.app.vault.getRoot().path,
                new Component()
              );
            },
          },
        ],
      },
    ];
  }

  override display(): void {
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

    // Limit line width group
    const maxCharGroup = new SettingGroup(this.containerEl).setHeading(
      "Limit line width"
    );
    this.registerFeaturesInGroup(maxCharGroup, this.tm.features.maxChar);

    // Dimming group
    const dimmingGroup = new SettingGroup(this.containerEl).setHeading(
      "Dimming"
    );
    this.registerFeaturesInGroup(dimmingGroup, this.tm.features.dimming);

    // Writing focus group
    const writingFocusGroup = new SettingGroup(this.containerEl).setHeading(
      "Writing focus"
    );
    this.registerFeaturesInGroup(
      writingFocusGroup,
      this.tm.features.writingFocus
    );

    // Hemingway mode group
    const hemingwayGroup = new SettingGroup(this.containerEl).setHeading(
      "Hemingway mode"
    );
    this.registerFeaturesInGroup(
      hemingwayGroup,
      this.tm.features.hemingwayMode
    );

    // Restore cursor position group
    const restoreCursorGroup = new SettingGroup(this.containerEl).setHeading(
      "Restore cursor position"
    );
    this.registerFeaturesInGroup(
      restoreCursorGroup,
      this.tm.features.restoreCursorPosition
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
