import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors';
import fs from 'node:fs';
import path from 'node:path';

// 1. Define Brand Ratios (Standard Scale)
const brandRatios = [1.1, 1.5, 2, 3, 4.5, 6, 7.5, 9, 11];

/** Define Surface Ratios (Subtle contrast for UI elements like dialogs, admonitions, quotes, highlights etc...).
 * * 1.05 and 1.1 are great for cards, dialogs, and code blocks
 */
const surfaceRatios = [1.05, 1.1, 1.2];

// 3. Define the Neutral/Background scale
const neutralBase = new BackgroundColor({
	name: 'neutral',
	colorKeys: ['#ffffff'],
	ratios: surfaceRatios, // This generates your 'surface' colors
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

			colorTokens.color[scaleName] = colorObj.values.reduce(
				(acc: any, swatch: any, index: number) => {
					// We'll use a naming convention: 10, 20, 30 for surfaces; 100, 200... for brand
					const isNeutral = scaleName === 'neutral';
					const step = isNeutral ? (index + 1) * 10 : (index + 1) * 100;

					// W3C compliant structure
					acc[step] = {
						$value: swatch.value, // Hex code
						$type: 'color', // Explicit type per token
						$description: `Contrast ratio of ${swatch.contrast}:1 against base background`,
					};
					return acc;
				},
				{},
			);
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
