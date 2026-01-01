import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors';
import fs from 'node:fs';
import path from 'node:path';

// 1. Define Scale Ratios
const brandRatios = {
	'100': 1.1,
	'200': 1.5,
	'300': 2,
	'400': 3,
	'500': 4.5,
	'600': 6,
	'700': 7.5,
	'800': 9,
	'900': 11,
};
const surfaceRatios = { '10': 1.05, '20': 1.1, '30': 1.2 };

// 2. Define Colors
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
	// Initialize W3C structure
	const colorTokens: any = {
		color: {
			$type: 'color',
			neutral: {}, // We will pre-populate the neutral object
		},
	};

	/**
	 * STEP 1: Capture the actual Background base color.
	 * Leonardo stores the background anchor in 'myTheme.backgroundColor'
	 */
	const bgBase = myTheme.backgroundColor;
	colorTokens.color.neutral['0'] = {
		$value: bgBase.value,
		$type: 'color',
		$description: 'Base background anchor (0 contrast)',
	};

	/**
	 * STEP 2: Capture all scales (Neutral surfaces and Brand colors)
	 */
	myTheme.contrastColors.forEach((colorObj) => {
		if ('values' in colorObj && 'name' in colorObj) {
			const scaleName = colorObj.name;

			// Ensure the scale object exists (especially for brand colors)
			if (!colorTokens.color[scaleName]) {
				colorTokens.color[scaleName] = {};
			}

			colorObj.values.forEach((swatch: any) => {
				// Strip the scale name from the swatch name to get the key (e.g., "blue100" -> "100")
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
		'✅ W3C Tokens generated including Background anchor and Neutral surfaces.',
	);
}

generateTokens();
