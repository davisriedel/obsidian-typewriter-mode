import { Remote } from "electron";

declare global {
	interface Window {
		electron: {
			remote: Remote;
		};
	}
}
