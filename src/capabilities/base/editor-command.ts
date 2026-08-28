import type { Editor, MarkdownFileInfo, MarkdownView } from "obsidian";
import { t } from "@/i18n";
import { AbstractCommand } from "./abstract-command";

export abstract class EditorCommand extends AbstractCommand {
  protected override registerCommand() {
    this.tm.plugin.addCommand({
      editorCallback: this.onCommand.bind(this),
      id: this.commandKey,
      name: t(this.commandTitle),
    });
  }

  override load() {
    this.registerCommand();
  }

  protected abstract onCommand(
    editor: Editor,
    view: MarkdownView | MarkdownFileInfo
  ): void;
}
