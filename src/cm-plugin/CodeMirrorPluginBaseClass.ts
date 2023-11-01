/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import type { EditorView, ViewUpdate } from "@codemirror/view";
import { Transaction } from "@codemirror/state";
import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";

export default abstract class CodeMirrorPluginBaseClass {
  private domResizeObserver: ResizeObserver;

  constructor(protected view: EditorView) {
    this.onLoad();
    this.domResizeObserver = new ResizeObserver(this.onResize.bind(this));
    this.domResizeObserver.observe(this.view.dom);
  }

  private userEventAllowed(event: string) {
    const { isTypewriterOnlyUseCommandsEnabled } =
      this.view.state.facet(pluginSettingsFacet);

    let allowed = /^(select|input|delete|undo|redo)(\..+)?$/;
    let disallowed = /^(select.pointer)$/;

    if (isTypewriterOnlyUseCommandsEnabled) {
      allowed = /^(input|delete|undo|redo)(\..+)?$/;
      disallowed = /^(select)(\..+)?$/;
    }

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
    const userEventsAllowed = this.userEventsAllowed(update);

    if (userEventsAllowed === null) {
      this.updateNonUserEvent();
      return;
    }

    userEventsAllowed
      ? this.updateAllowedUserEvent()
      : this.updateDisallowedUserEvent();
  }

  protected onLoad() {}
  protected updateAllowedUserEvent() {}
  protected updateDisallowedUserEvent() {}
  protected updateNonUserEvent() {}
  protected onResize() {}

  destroy() {
    this.domResizeObserver?.disconnect();
  }
}
