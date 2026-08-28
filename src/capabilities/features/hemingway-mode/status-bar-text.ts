import type {
  SettingDefinition,
  SettingGroup,
  TextComponent,
  ToggleComponent,
} from "obsidian";
import { Feature } from "@/capabilities/base/feature";
import { t } from "@/i18n";
import type HemingwayMode from "./hemingway-mode";

export default class HemingwayModeStatusBarText extends Feature {
  readonly settingKey = "hemingwayMode.hemingwayModeStatusBarText" as const;
  protected settingTitle = "Status bar text";
  protected settingDesc =
    "Text to display in the status bar when Hemingway mode is active. Turn the toggle on to use a custom text or off to use the default text for your locale.";

  private textComponent: TextComponent | null = null;
  private lastCustomValue: string | null = null;

  private setupTextComponent(component: TextComponent, onChange?: () => void) {
    this.textComponent = component;
    const currentValue = this.getSettingValue();
    if (currentValue !== null) {
      this.lastCustomValue = currentValue;
    }
    component
      .setValue(currentValue ?? t("Hemingway"))
      .setDisabled(currentValue === null)
      .onChange((newValue) => {
        this.lastCustomValue = newValue;
        this.setSettingValue(newValue);
        this.tm.saveSettings().catch((error) => {
          console.error("Failed to save settings:", error);
        });
        this.updateHemingwayModeStatusBar();
        onChange?.();
      });
  }

  private setupToggle(toggle: ToggleComponent, onChange?: () => void) {
    toggle
      .setTooltip(t("Use custom text"))
      .setValue(this.getSettingValue() !== null)
      .onChange((useCustom) => {
        const newValue = useCustom
          ? (this.lastCustomValue ?? t("Hemingway"))
          : null;
        this.setSettingValue(newValue);
        this.textComponent?.setValue(newValue ?? t("Hemingway"));
        this.textComponent?.setDisabled(!useCustom);
        this.tm.saveSettings().catch((error) => {
          console.error("Failed to save settings:", error);
        });
        this.updateHemingwayModeStatusBar();
        onChange?.();
      });
  }

  getDefinition(onChanged?: () => void): SettingDefinition {
    return {
      desc: t(this.settingDesc),
      name: t(this.settingTitle),
      render: (setting) => {
        setting
          .setClass("typewriter-mode-setting")
          .addToggle((toggle) => this.setupToggle(toggle, onChanged))
          .addText((component) =>
            this.setupTextComponent(component, onChanged)
          );
      },
    };
  }

  registerSetting(settingGroup: SettingGroup) {
    settingGroup.addSetting((setting) => {
      setting
        .setName(t(this.settingTitle))
        .setDesc(t(this.settingDesc))
        .setClass("typewriter-mode-setting")
        .addToggle((toggle) => this.setupToggle(toggle))
        .addText((component) => this.setupTextComponent(component));
    });
  }

  private updateHemingwayModeStatusBar() {
    const hemingwayMode = this.tm.features.hemingwayMode[
      "hemingwayMode.isHemingwayModeEnabled"
    ] as HemingwayMode;
    hemingwayMode.updateStatusBarText();
  }
}
