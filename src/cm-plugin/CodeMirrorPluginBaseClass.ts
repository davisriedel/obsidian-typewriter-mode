import { pluginSettingsFacet } from "@/cm-plugin/PluginSettingsFacet";
import { Transaction } from "@codemirror/state";
import type { EditorView, ViewUpdate } from "@codemirror/view";

export default abstract class CodeMirrorPluginBaseClass {
	private domResizeObserver: ResizeObserver;

	constructor(protected view: EditorView) {
		this.onLoad();

		this.domResizeObserver = new ResizeObserver(this.onResize.bind(this));
		this.domResizeObserver.observe(this.view.dom.ownerDocument.body);
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

	private inspectTransactions(update: ViewUpdate) {
		const userEvents = [];
		let isReconfigured = false;
		for (const tr of update.transactions) {
			if (tr.reconfigured) isReconfigured = true;

			const event = tr.annotation(Transaction.userEvent);
			if (event !== undefined) userEvents.push(event);
		}

		if (userEvents.length === 0)
			return {
				isReconfigured,
				isUserEvent: false,
				allowedUserEvents: null,
			};

		const allowedUserEvents = userEvents.reduce<boolean>((result, event) => {
			return result && this.userEventAllowed(event);
		}, userEvents.length > 0);
		return {
			isReconfigured: false,
			isUserEvent: true,
			allowedUserEvents,
		};
	}

	update(update: ViewUpdate) {
		const { isReconfigured, isUserEvent, allowedUserEvents } =
			this.inspectTransactions(update);

		if (isReconfigured) this.onReconfigured();

		if (!isUserEvent) {
			this.updateNonUserEvent();
			return;
		}

		allowedUserEvents
			? this.updateAllowedUserEvent()
			: this.updateDisallowedUserEvent();
	}

	protected onLoad() {}
	protected onReconfigured() {}
	protected updateAllowedUserEvent() {}
	protected updateDisallowedUserEvent() {}
	protected updateNonUserEvent() {}
	protected onResize() {}

	destroy() {
		this.domResizeObserver?.disconnect();
	}
}
