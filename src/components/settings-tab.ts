import type { App, SettingDefinition, SettingDefinitionItem } from "obsidian";
import {
  Component,
  MarkdownRenderer,
  PluginSettingTab,
  SettingGroup,
} from "obsidian";
import { localizedMarkdown, t } from "@/i18n";
import type TypewriterModeLib from "@/lib";
import fundingText from "@/texts/Funding.md" with { type: "text" };
import fundingTextZhCN from "@/texts/Funding.zh-CN.md" with { type: "text" };

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
        heading: t("Typewriter"),
        items: [
          {
            name: t(
              'Not available if "keep lines above and below" is activated'
            ),
            visible: () =>
              this.tm.settings.keepLinesAboveAndBelow
                .isKeepLinesAboveAndBelowEnabled,
          },
          ...this.featureDefs(this.tm.features.typewriter, refresh),
        ],
        type: "group",
      },

      // Keep lines above and below
      {
        heading: t("Keep lines above and below"),
        items: [
          {
            name: t("Not available if typewriter scrolling is activated"),
            visible: () =>
              this.tm.settings.typewriter.isTypewriterScrollEnabled,
          },
          ...this.featureDefs(this.tm.features.keepAboveAndBelow, refresh),
        ],
        type: "group",
      },

      // Highlight current line
      {
        heading: t("Highlight current line"),
        items: this.featureDefs(this.tm.features.currentLine, refresh),
        type: "group",
      },

      // Limit line width
      {
        heading: t("Limit line width"),
        items: this.featureDefs(this.tm.features.maxChar, refresh),
        type: "group",
      },

      // Dimming
      {
        heading: t("Dimming"),
        items: this.featureDefs(this.tm.features.dimming, refresh),
        type: "group",
      },

      // Writing focus
      {
        heading: t("Writing focus"),
        items: this.featureDefs(this.tm.features.writingFocus, refresh),
        type: "group",
      },

      // Hemingway mode
      {
        heading: t("Hemingway mode"),
        items: this.featureDefs(this.tm.features.hemingwayMode, refresh),
        type: "group",
      },

      // Restore cursor position
      {
        heading: t("Restore cursor position"),
        items: this.featureDefs(
          this.tm.features.restoreCursorPosition,
          refresh
        ),
        type: "group",
      },

      // Update notice and funding
      {
        heading: t("Update notice and funding"),
        items: [
          ...this.featureDefs(this.tm.features.updates, refresh),
          {
            name: "",
            render: (setting) => {
              setting.settingEl.empty();
              const div = setting.settingEl.createDiv();
              const component = new Component();
              component.load();
              MarkdownRenderer.render(
                this.app,
                localizedMarkdown(fundingText, fundingTextZhCN),
                div,
                this.app.vault.getRoot().path,
                component
              ).catch((error) => {
                console.error("Failed to render markdown:", error);
              });
            },
          },
        ],
        type: "group",
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
      t("Typewriter")
    );
    if (
      this.tm.settings.keepLinesAboveAndBelow.isKeepLinesAboveAndBelowEnabled
    ) {
      typewriterGroup.addSetting((setting) => {
        setting.setName(
          t('Not available if "keep lines above and below" is activated')
        );
      });
    }
    this.registerFeaturesInGroup(typewriterGroup, this.tm.features.typewriter);

    // Keep lines above and below group
    const keepLinesGroup = new SettingGroup(this.containerEl).setHeading(
      t("Keep lines above and below")
    );
    if (this.tm.settings.typewriter.isTypewriterScrollEnabled) {
      keepLinesGroup.addSetting((setting) => {
        setting.setName(
          t("Not available if typewriter scrolling is activated")
        );
      });
    }
    this.registerFeaturesInGroup(
      keepLinesGroup,
      this.tm.features.keepAboveAndBelow
    );

    // Highlight current line group
    const currentLineGroup = new SettingGroup(this.containerEl).setHeading(
      t("Highlight current line")
    );
    this.registerFeaturesInGroup(
      currentLineGroup,
      this.tm.features.currentLine
    );

    // Limit line width group
    const maxCharGroup = new SettingGroup(this.containerEl).setHeading(
      t("Limit line width")
    );
    this.registerFeaturesInGroup(maxCharGroup, this.tm.features.maxChar);

    // Dimming group
    const dimmingGroup = new SettingGroup(this.containerEl).setHeading(
      t("Dimming")
    );
    this.registerFeaturesInGroup(dimmingGroup, this.tm.features.dimming);

    // Writing focus group
    const writingFocusGroup = new SettingGroup(this.containerEl).setHeading(
      t("Writing focus")
    );
    this.registerFeaturesInGroup(
      writingFocusGroup,
      this.tm.features.writingFocus
    );

    // Hemingway mode group
    const hemingwayGroup = new SettingGroup(this.containerEl).setHeading(
      t("Hemingway mode")
    );
    this.registerFeaturesInGroup(
      hemingwayGroup,
      this.tm.features.hemingwayMode
    );

    // Restore cursor position group
    const restoreCursorGroup = new SettingGroup(this.containerEl).setHeading(
      t("Restore cursor position")
    );
    this.registerFeaturesInGroup(
      restoreCursorGroup,
      this.tm.features.restoreCursorPosition
    );

    // Update notice and funding group
    const updatesGroup = new SettingGroup(this.containerEl).setHeading(
      t("Update notice and funding")
    );
    this.registerFeaturesInGroup(updatesGroup, this.tm.features.updates);

    const updateNoticeDiv = this.containerEl.createDiv();
    this.containerEl.appendChild(updateNoticeDiv);
    const fundingComponent = new Component();
    fundingComponent.load();
    MarkdownRenderer.render(
      this.app,
      localizedMarkdown(fundingText, fundingTextZhCN),
      updateNoticeDiv,
      this.app.vault.getRoot().path,
      fundingComponent
    ).catch((error) => {
      console.error("Failed to render markdown:", error);
    });
  }
}
