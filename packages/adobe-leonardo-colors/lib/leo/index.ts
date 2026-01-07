import {
	BackgroundColor,
	Color,
	ColorBase,
	Theme,
} from '@adobe/leonardo-contrast-colors';

/** We extend the ColorBase to include our specific ratios object type */
export interface TokenScaleConfig<T extends string>
	extends Omit<ColorBase, 'ratios'> {
	ratios: Record<T, number>;
	// isBackground?: boolean;
}

/** Shared interface for all Scales.
 * This allows you to pass both ColorScale and BackgroundColorScale
 * into functions that only care about the token structure.
 */
export interface ITokenScale {
	readonly colorName: string;
	readonly ratioKeys: string[];
	// readonly isBackground: boolean;
	/** Generates the W3C alias string.
	 * Constrained by T to ensure the key exists in this scale.
	 * (e.g., "{color.brand.500}")
	 */
	step(key: string): string;
}

/**
 * ColorScale extends the Leonardo Color class directly.
 * It carries the name and keys needed for W3C aliasing.
 */
export class ColorScale<T extends string> extends Color implements ITokenScale {
	public readonly ratioKeys: T[];
	public readonly colorName: string;
	// public readonly isBackground: boolean;

	constructor(config: TokenScaleConfig<T>) {
		// Pass standard params to Leonardo Color parent
		super({
			name: config.name,
			colorKeys: config.colorKeys,
			ratios: Object.values(config.ratios),
			colorspace: config.colorspace || 'LAB',
		});
		this.colorName = config.name;
		this.ratioKeys = Object.keys(config.ratios) as T[];
		// this.isBackground = !!config.isBackground;
	}

	public step(key: T): string {
		return `{color.${this.colorName}.${key}}`;
	}
}

/**
 * BackgroundColorScale extends the Leonardo BackgroundColor class directly.
 * It carries the name and keys needed for W3C aliasing.
 */
export class BackgroundColorScale<T extends string>
	extends BackgroundColor
	implements ITokenScale
{
	public readonly ratioKeys: T[];
	public readonly colorName: string;
	// public readonly isBackground: boolean;

	constructor(config: TokenScaleConfig<T>) {
		super({
			name: config.name,
			colorKeys: config.colorKeys,
			ratios: Object.values(config.ratios),
		});
		this.colorName = config.name;
		this.ratioKeys = Object.keys(config.ratios) as T[];
		// this.isBackground = !!config.isBackground;
	}

	public step(key: T): string {
		return `{color.${this.colorName}.${key}}`;
	}
}

/** Type guard to safely identify our custom scales */
export type AnyScale = (ColorScale<string> | BackgroundColorScale<string>) &
	ITokenScale;

/** Internal Leonardo Casting Types */
interface LeonardoSwatch {
	name: string;
	value: string;
	contrast: number;
}
/** Background scales in theme.contrastColors have this shape */
interface LeonardoBackgroundOutput {
	// name: string;
	// values: LeonardoSwatch[];
	background: string; // Background unique property
}
/** Foreground scales in theme.contrastColors have this shape */
interface LeonardoColorOutput {
	name: string;
	values: LeonardoSwatch[];
}

// type LeonardoOutputScale = LeonardoBackgroundOutput | LeonardoColorOutput;

/** Public Data Shapes */
export interface Swatch {
	key: string;
	value: string;
	contrast: number;
}

export interface NormalizedScale {
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
		lightness: number = 100
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
			...LeonardoColorOutput[]
		];

		return fgScales.map((generatedScale) => {
			// Because of ITokenScale, we know every scale has colorName
			const originalScale = this.allScales.find(
				(s) => s.colorName === generatedScale.name
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
