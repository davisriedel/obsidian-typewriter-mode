import { Command } from "@/features/base/Command";

export class ToggleTypewriterAndDimming extends Command {
  protected commandKey = "typewriter-scrolling-and-paragraph-dimming";
  protected commandTitle =
    "Toggle Typewriter Scrolling And Paragraph Dimming On/Off";

  protected onCommand(): void {
    const { isTypewriterScrollEnabled, isDimUnfocusedParagraphsEnabled } =
      this.plugin.settings;
    const isOn = isTypewriterScrollEnabled && isDimUnfocusedParagraphsEnabled;
    this.plugin.features.TypewriterScroll.toggle(!isOn);
    this.plugin.features.DimUnfocusedParagraphs.toggle(!isOn);
  }
}
