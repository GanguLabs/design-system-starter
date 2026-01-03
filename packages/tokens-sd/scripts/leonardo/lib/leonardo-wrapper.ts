import { Theme } from '@adobe/leonardo-contrast-colors';
import {
	LeonardoBackgroundOutput,
	LeonardoColorOutput,
} from '../models/leonardo-color-output';
import {
	AnyScale,
	BackgroundColorScale,
} from '../models/leonardo-color-scales';

interface Swatch {
	key: string;
	value: string;
	contrast: number;
}
interface NormalizedScale {
	colorName: string;
	swatches: Swatch[];
}

export class LeonardoThemeWrapper {
	private theme: Theme;
	private allScales: AnyScale[];
	private backgroundScale: BackgroundColorScale<string>;

	constructor(
		allScales: AnyScale[],
		backgroundScale: BackgroundColorScale<string>,
		lightness: number = 100,
	) {
		this.allScales = allScales;
		this.backgroundScale = backgroundScale;
		this.theme = new Theme({
			colors: allScales,
			backgroundColor: backgroundScale,
			lightness: lightness,
			contrast: 1,
		});
	}

	/**
	 * Normalizes the complex Leonardo output into a clean array of Swatches.
	 * Re-inserts the background anchor into the correct position.
	 */
	public getNormalizedScales(): NormalizedScale[] {
		const [bgData, ...fgScales] = this.theme.contrastColors as unknown as [
			LeonardoBackgroundOutput,
			...LeonardoColorOutput[],
		];

		return fgScales.map((generatedScale) => {
			const originalScale = this.allScales.find(
				(s) => s.colorName === generatedScale.name,
			);
			if (!originalScale)
				throw new Error(`Scale ${generatedScale.name} not found.`);

			const isBgAnchorScale =
				generatedScale.name === this.backgroundScale.colorName;
			const anchorIndex = isBgAnchorScale
				? Object.values(this.backgroundScale.ratios).indexOf(1)
				: -1;

			const swatches: Swatch[] = [];

			// if (isBgAnchorScale && anchorIndex !== -1) {
			// 	// 1. Process swatches BEFORE the anchor
			// 	for (let i = 0; i < generatedScale.values.length; i++) {
			// 		const s = generatedScale.values[i];
			// 		swatches.push({
			// 			key: originalScale.ratioKeys[i],
			// 			value: s.value,
			// 			contrast: s.contrast,
			// 		});
			// 	}

			// 	// // 2. Insert the Anchor Swatch
			// 	// swatches.push({
			// 	// 	key: originalScale.ratioKeys[anchorIndex],
			// 	// 	value: bgData.background,
			// 	// 	contrast: 1,
			// 	// });

			// 	// // 3. Process swatches AFTER the anchor (shifted by 1)
			// 	// for (let i = anchorIndex; i < generatedScale.values.length; i++) {
			// 	// 	const s = generatedScale.values[i];
			// 	// 	swatches.push({
			// 	// 		key: originalScale.ratioKeys[i + 1],
			// 	// 		value: s.value,
			// 	// 		contrast: s.contrast,
			// 	// 	});
			// 	// }
			// } else {
			// Standard mapping for non-background scales
			generatedScale.values.forEach((s, i) => {
				swatches.push({
					key: originalScale.ratioKeys[i],
					value: s.value,
					contrast: s.contrast,
				});
			});
			// }

			const output: NormalizedScale = {
				colorName: generatedScale.name,
				swatches,
			};
			return output;
		});
	}
}
