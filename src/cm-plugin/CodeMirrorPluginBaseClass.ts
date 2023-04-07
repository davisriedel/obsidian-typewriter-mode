/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { EditorView, ViewUpdate } from "@codemirror/view";
import { Transaction } from "@codemirror/state";

export default abstract class CodeMirrorPluginBaseClass {
  private internalUpdate = false;

  constructor(protected view: EditorView) {
    this.onload();
  }

  private userEventAllowed(event: string) {
    const allowed = /^(select|input|delete|undo|redo)(\..+)?$/;
    const disallowed = /^(select.pointer)$/;
    return allowed.test(event) && !disallowed.test(event);
  }

  private userEventsAllowed(update: ViewUpdate) {
    const userEvents = update.transactions
      .map((tr) => tr.annotation(Transaction.userEvent))
      .filter((event) => event !== undefined);
    if (userEvents.length === 0) return null;
    return userEvents.reduce<boolean>((result, event) => {
      return result && this.userEventAllowed(event);
    }, userEvents.length > 0);
  }

  update(update: ViewUpdate) {
    // Ignore updates that are caused by this plugin
    if (this.internalUpdate) {
      this.internalUpdate = false;
      return;
    }

    const userEventsAllowed = this.userEventsAllowed(update);
    if (userEventsAllowed === null) return;

    this.internalUpdate = true;
    userEventsAllowed
      ? this.updateAllowedUserEvent(update)
      : this.updateDisallowedUserEvent(update);
  }

  protected onload() {}
  protected updateAllowedUserEvent(update: ViewUpdate) {}
  protected updateDisallowedUserEvent(update: ViewUpdate) {}

  destroy() {}
}
