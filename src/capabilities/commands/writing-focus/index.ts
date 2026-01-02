// ADAPTED FROM https://github.com/ryanpcmcquen/obsidian-focus-mode

import { ToggleCommand } from "@/capabilities/base/toggle-command";
import { WritingFocus } from "./writing-focus";

export class WritingFocusCommand extends ToggleCommand {
  protected override featureToggle = null;

  readonly commandKey = "writing-focus";
  readonly commandTitle = "writing focus";

  private readonly writingFocus = new WritingFocus(this.tm);

  protected override onCommand(): void {
    this.writingFocus.toggleFocusMode();
  }

  protected override onEnable(): void {
    this.writingFocus.enableFocusMode();
  }

  protected override onDisable(): void {
    this.writingFocus.disableFocusMode();
  }

  onload() {
    this.tm.plugin.addRibbonIcon(
      "enter",
      "Toggle Writing Focus",
      (_event): void => {
        this.writingFocus.toggleFocusMode();
      }
    );
  }
}
