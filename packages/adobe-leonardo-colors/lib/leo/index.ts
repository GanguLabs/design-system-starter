import {
	BackgroundColor,
	Color,
	CssColor,
	Theme,
} from '@adobe/leonardo-contrast-colors';

export const generateScale = (name: string, hex: CssColor) => {
	return new Color({
		name: name,
		colorKeys: [hex],
		ratios: [3, 4.5, 7], // Standard WCAG contrast ratios
	});
};

// Your wrapper function to simplify theme creation
export const createBrandTheme = (
	baseColor: CssColor[],
	brightness: number = 100
) => {
	const brandScale = new Color({
		name: 'brand',
		colorKeys: baseColor,
		ratios: [],
		colorspace: 'RGB',
	});
	const backgroundColor = new BackgroundColor({
		name: 'brand',
		colorKeys: ['#ffffff'],
		ratios: [],
		colorspace: 'RGB',
	});

	return new Theme({
		colors: [brandScale],
		backgroundColor,
		lightness: brightness,
	});
};

export type ThemeOutput = { name: string; background: string; values: any[] };
