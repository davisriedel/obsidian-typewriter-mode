import { FeatureToggle } from "@/features/base/FeatureToggle";
import type { TypewriterModeSettings } from "@/TypewriterModeSettings";

export default class TypewriterOnlyUseCommands extends FeatureToggle {
  protected setting: keyof TypewriterModeSettings =
    "isTypewriterOnlyUseCommandsEnabled";
  protected override toggleClass = "ptm-typewriter-only-use-commands";
  protected requiresReload = true;
  protected hasCommand = false;
  protected settingTitle = "Do Not Snap Typewriter With Arrow Keys";
  protected settingDesc =
    "The typewriter will only snap when using this plugin's move commands. It will not snap when using the arrow keys. The move commands are by default Cmd/Ctrl+ArrowUp/ArrowDown, but you can assign your own hotkeys for the move commands in Obsidian's settings.";

  protected override isSettingEnabled(): boolean {
    return this.plugin.settings.isTypewriterScrollEnabled;
  }
}
