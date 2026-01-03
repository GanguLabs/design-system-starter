import {
	BackgroundColorScale,
	ColorScale,
} from '../models/leonardo-color-scales';

export const neutral = new BackgroundColorScale({
	name: 'neutral',
	colorKeys: ['#f0f0f0'],
	// Using '0' as ratio 1 creates the base background anchor in the scale
	// Note that the 0 scale below still might generate different color than the one define above based on the lightness & contrast of the theme
	ratios: {
		/**
		 * In dark mode, you might want some colors to be darker than your background (like a deep inset shadow). Leonardo supports negative ratios for this.
		 * * Ratio 4.5: A color that is 4.5 times brighter than the background.
		 * * Ratio -1.5: A color that is 1.5 times darker than the background.
		 */
		inset: -1.2, // Darker than the surface (good for inputs in dark mode)
		'0': 1,
		'10': 1.05, // Dialog / Modal
		'20': 1.1, // Admonition / Quote
		'30': 1.2, // Details / Hover states,
	},
	// isBackground: true,
});

export const blue = new ColorScale({
	name: 'blue',
	colorKeys: ['#d1eaff', '#0070f3', '#003366'],

	ratios: {
		'100': 1.1,
		'200': 1.5,
		'300': 2,
		'400': 3,
		'500': 4.5,
		'600': 6,
		'700': 7.5,
		'800': 9,
		'900': 11,
	},
});

// A registry for the generator loop
export const allScales = [neutral, blue];
