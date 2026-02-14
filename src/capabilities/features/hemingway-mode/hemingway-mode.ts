import { FeatureToggle } from "@/capabilities/base/feature-toggle";

export default class HemingwayMode extends FeatureToggle {
  readonly settingKey = "hemingwayMode.isHemingwayModeEnabled" as const;
  protected override toggleClass = "ptm-hemingway-mode-enabled";
  protected settingTitle = "Hemingway mode";
  protected settingDesc =
    "Prevents editing previously written text. Blocks navigation keys (arrows, Home, End, Page Up/Down), Delete key, and undo operations to enforce forward-only writing.";

  private statusBarItem: HTMLElement | null = null;

  override load() {
    super.load();
    this.statusBarItem = this.tm.plugin.addStatusBarItem();
    this.statusBarItem.addClass("ptm-hemingway-mode-status");
    this.updateStatusBar();
  }

  override enable() {
    super.enable();
    this.registerKeyboardHandler();
    this.updateStatusBar();
  }

  override disable() {
    super.disable();
    this.unregisterKeyboardHandler();
    this.updateStatusBar();
  }

  private updateStatusBar() {
    if (!this.statusBarItem) {
      return;
    }

    const isEnabled = this.getSettingValue() as boolean;
    const showStatusBar =
      this.tm.settings.hemingwayMode.isShowHemingwayModeStatusBarEnabled;
    const statusBarText =
      this.tm.settings.hemingwayMode.hemingwayModeStatusBarText;

    if (isEnabled && showStatusBar) {
      this.statusBarItem.setText(statusBarText);
      this.statusBarItem.show();
    } else {
      this.statusBarItem.hide();
    }
  }

  updateStatusBarText() {
    this.updateStatusBar();
  }

  private keyboardHandler = (event: KeyboardEvent) => {
    if (!this.getSettingValue()) {
      return;
    }

    const forbiddenKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Delete",
    ];

    const isUndo = event.key === "z" && (event.ctrlKey || event.metaKey);
    const isBackspace = event.key === "Backspace";
    const isAllowBackspace =
      this.tm.settings.hemingwayMode.isAllowBackspaceInHemingwayModeEnabled;

    if (forbiddenKeys.includes(event.key) || isUndo) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (isBackspace && !isAllowBackspace) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private registerKeyboardHandler() {
    document.addEventListener("keydown", this.keyboardHandler, {
      capture: true,
    });
  }

  private unregisterKeyboardHandler() {
    document.removeEventListener("keydown", this.keyboardHandler, {
      capture: true,
    });
  }
}
