import {
	BackgroundColor,
	Color,
	ColorBase,
} from '@adobe/leonardo-contrast-colors';

/** We extend the ColorBase to include our specific ratios object type */
export interface TokenScaleConfig<T extends string>
	extends Omit<ColorBase, 'ratios'> {
	ratios: Record<T, number>;
	// isBackground?: boolean;
}

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
