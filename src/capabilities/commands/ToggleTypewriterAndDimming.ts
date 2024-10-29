import type { FeatureToggle } from "../base/FeatureToggle";
import { ToggleCommand } from "../base/ToggleCommand";

export class ToggleTypewriterAndDimming extends ToggleCommand {
	protected override featureToggle = null;

	public readonly commandKey = "typewriter-scrolling-and-paragraph-dimming";
	public readonly commandTitle = "typewriter scrolling and paragraph dimming";

	protected override onCommand(): void {
		const typewriterScrollFeature = this.tm.features.typewriter
			.isTypewriterScrollEnabled as FeatureToggle;
		const dimUnfocusedFeature = this.tm.features.dimming
			.isDimUnfocusedEnabled as FeatureToggle;
		const isOn =
			typewriterScrollFeature.getSettingValue() &&
			dimUnfocusedFeature.getSettingValue();
		typewriterScrollFeature.toggle(!isOn);
		dimUnfocusedFeature.toggle(!isOn);
	}

	protected override onEnable(): void {
		(
			this.tm.features.typewriter.isTypewriterScrollEnabled as FeatureToggle
		).toggle(true);
		(this.tm.features.dimming.isDimUnfocusedEnabled as FeatureToggle).toggle(
			true,
		);
	}

	protected override onDisable(): void {
		(
			this.tm.features.typewriter.isTypewriterScrollEnabled as FeatureToggle
		).toggle(false);
		(this.tm.features.dimming.isDimUnfocusedEnabled as FeatureToggle).toggle(
			false,
		);
	}
}
