import type { ColorBase } from '@adobe/leonardo-contrast-colors';
import { BackgroundColor, Color, Theme } from '@adobe/leonardo-contrast-colors';
import fs from 'node:fs';
import path from 'node:path';

/**
 * 1. Define the Type-Safe Configuration
 * We use a generic record for ratios so the keys ('0', '10', etc.)
 * are preserved for the token generation.
 */
interface TokenScaleConfig extends ColorBase {
	// name: string;
	// colorKeys: string[];
	// ratios: Record<string, number>;
	// colorspace?: 'LAB' | 'LCH' | 'RGB' | 'HSL';
	isBackground?: boolean;
}

const scalesConfig: TokenScaleConfig[] = [
	{
		name: 'neutral',
		colorKeys: ['#ffffff'],
		// Using '0' as ratio 1 creates the base background anchor in the scale
		ratios: { '0': 1, '10': 1.05, '20': 1.1, '30': 1.2 },
		isBackground: true,
	},
	{
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
	},
];

/**
 * 2. Theme Orchestration
 */
const namingMap = new Map<string, string[]>();
const leonardoColors: Color[] = [];
let bgAnchor: BackgroundColor | undefined;

scalesConfig.forEach((cfg) => {
	// Store the keys for the token loop
	namingMap.set(cfg.name, Object.keys(cfg.ratios));

	const colorParams: ColorBase = {
		name: cfg.name,
		colorKeys: cfg.colorKeys,
		ratios: cfg.ratios,
		colorspace: cfg.colorspace || 'LAB',
	};

	// Instantiate the standard Color for the scale
	leonardoColors.push(new Color(colorParams));

	// If flagged, create the BackgroundColor anchor
	if (cfg.isBackground) {
		// This is a workaround - because the BackgroundColor ratios are not available in myTheme.contrastColors below
		bgAnchor = new BackgroundColor({
			name: cfg.name,
			colorKeys: cfg.colorKeys,
			ratios: cfg.ratios,
		});
	}
});

if (!bgAnchor) throw new Error('No background scale defined.');

const myTheme = new Theme({
	colors: leonardoColors,
	backgroundColor: bgAnchor,
	lightness: 97,
	contrast: 1,
});

/**
 * 3. W3C Token Generation
 */
function generateTokens() {
	// Initialize W3C structure
	const colorTokens: any = {
		color: {
			$type: 'color',
			neutral: {}, // We will pre-populate the neutral object
		},
	};

	// Skip the internal BackgroundColorAnchor (Index 0)
	const [, ...scales] = myTheme.contrastColors;

	scales.forEach((scale) => {
		const scaleName = scale.name;
		const keys = namingMap.get(scaleName);
		if (!keys) return;

		// Ensure the scale object exists (especially for brand colors)
		if (!colorTokens.color[scaleName]) {
			colorTokens.color[scaleName] = {};
		}

		scale.values.forEach((swatch, index) => {
			const stepKey = keys[index] || (index + 1).toString();

			colorTokens.color[scaleName][stepKey] = {
				$value: swatch.value,
				$type: 'color',
				$description: `Contrast ratio: ${swatch.contrast}:1`,
			};
		});
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
