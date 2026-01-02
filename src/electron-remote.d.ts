import type { BrowserWindow } from "electron";

declare global {
  interface Window {
    electron: {
      remote: {
        getCurrentWindow: () => BrowserWindow;
      };
    };
  }
}
