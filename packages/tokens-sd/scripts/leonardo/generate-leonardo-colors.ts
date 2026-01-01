import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors';
import fs from 'node:fs';
import path from 'node:path';

// 1. Use Objects for ratios to define explicit names
// For brand, we stick to the 100-900 convention
const brandRatios = {
	'100': 1.1,
	'200': 1.5,
	'300': 2,
	'400': 3,
	'500': 4.5, // Standard accessible body text
	'600': 6,
	'700': 7.5,
	'800': 9,
	'900': 11,
};

/** Define Surface Ratios (Subtle contrast for UI elements like dialogs, admonitions, quotes, highlights etc...).
 * * 1.05 and 1.1 are great for cards, dialogs, and code blocks
 * * For surfaces, we use semantic names or a 10-30 scale
 */
const surfaceRatios = {
	'10': 1.05, // Dialog / Modal
	'20': 1.1, // Admonition / Quote
	'30': 1.2, // Details / Hover states
};

const neutralBase = new BackgroundColor({
	name: 'neutral',
	colorKeys: ['#ffffff'],
	ratios: surfaceRatios,
});

const blue = new Color({
	name: 'blue',
	colorKeys: ['#d1eaff', '#0070f3', '#003366'],
	colorspace: 'LAB',
	ratios: brandRatios,
});

const myTheme = new Theme({
	colors: [blue],
	backgroundColor: neutralBase,
	lightness: 97,
	contrast: 1,
});

function generateTokens() {
	const colorTokens: any = {
		// Top-level $type can be used to set the type for all nested tokens
		color: { $type: 'color' },
	};

	myTheme.contrastColors.forEach((colorObj) => {
		if ('values' in colorObj && 'name' in colorObj) {
			const scaleName = colorObj.name;
			colorTokens.color[scaleName] = {};

			colorObj.values.forEach((swatch: any) => {
				/**
				 * Leonardo automatically appends the key from your ratios object
				 * to the color name (e.g., "blue" + "100" = "blue100").
				 * We strip the name back out to keep the JSON nested.
				 */
				const tokenStep = swatch.name.replace(scaleName, '');

				colorTokens.color[scaleName][tokenStep] = {
					$value: swatch.value,
					$type: 'color',
					$description: `Contrast: ${swatch.contrast}:1`,
				};
			});
		}
	});

	const outputPath = path.resolve(
		process.cwd(),
		'src/tokens/0-primitives/colors/leonardo/generated-colors.json',
	);

	if (!fs.existsSync(path.dirname(outputPath))) {
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	}

	fs.writeFileSync(outputPath, JSON.stringify(colorTokens, null, 2), 'utf-8');
	console.log(
		'✅ Successfully converted Leonardo colors to W3C Standard tokens',
	);
}

generateTokens();
