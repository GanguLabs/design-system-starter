import {
	BackgroundColor,
	Color,
	ColorBase,
	Theme,
} from '@adobe/leonardo-contrast-colors';

/**
 * WHY THIS WORKAROUND?
 * 1. Unified Iteration: Leonardo's Theme.contrastColors returns a tuple [Anchor, ...Scales].
 * The Anchor (index 0) has a different object structure than the Scales.
 * 2. Step '0' Mapping: By including the Background scale in the standard 'colors' array
 * with a ratio of 1, we force Leonardo to generate our #ffffff base as a standard swatch.
 * 3. Type Consistency: This allows our generator to loop through all colors using a
 * single logic path without manual 'if (name === "neutral")' injections.


 * 1. Define the Type-Safe Configuration
 * We use a generic record for ratios so the keys ('0', '10', etc.)
 * are preserved for the token generation.
 */
export interface TokenScaleConfig extends ColorBase {
	// name: string;
	// colorKeys: string[];
	ratios: Record<string, number>; // RatiosObject
	// colorspace?: 'LAB' | 'LCH' | 'RGB' | 'HSL';

	/** If true, this scale will be used as the contrast anchor for the whole theme */
	isBackground?: boolean;
}

export function createLeonardoTheme(configs: TokenScaleConfig[]) {
	const leonardoColors: Color[] = [];
	let bgAnchor: BackgroundColor | undefined;

	configs.forEach((cfg) => {
		// 1. Create a standard Color instance.
		// This ensures the color (including neutral 0, 10, etc.) appears in the 'scales' array.
		leonardoColors.push(new Color(cfg));

		// 2. Assign the background anchor.
		// We need a specific BackgroundColor instance to satisfy the Theme constructor.
		if (cfg.isBackground) {
			bgAnchor = new BackgroundColor({
				name: cfg.name,
				colorKeys: cfg.colorKeys,
				ratios: [], // We leave ratios empty here because the scale is handled by the Color above
			});
		}
	});

	if (!bgAnchor) {
		throw new Error(
			"Leonardo Wrapper: No configuration marked with 'isBackground: true'",
		);
	}

	// 3. Initialize the Theme.
	// Lightness 100 ensures that a 1:1 ratio (Step 0) returns the exact hex (e.g., #ffffff).
	return new Theme({
		colors: leonardoColors,
		backgroundColor: bgAnchor,
		lightness: 100,
		contrast: 1,
	});
}
