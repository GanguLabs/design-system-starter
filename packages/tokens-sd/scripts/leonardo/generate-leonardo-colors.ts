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

/**
 * Individual W3C Color Token leaf node
 */
interface W3CColorToken {
	$value: string;
	$type: 'color';
	$description?: string;
}

/**
 * A group of tokens (e.g., 'neutral' or 'blue')
 * Using a Record allows for dynamic keys like '0', '100', etc.
 */
interface W3CColorGroup {
	[step: string]: W3CColorToken;
}

/**
 * The root structure of the generated JSON
 */
interface W3CTokenExport {
	color: {
		$type: 'color';
		[scaleName: string]: W3CColorGroup | string; // 'string' accounts for the $type property
	};
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
	const colorTokens: W3CTokenExport = { color: { $type: 'color' } };

	const [, ...scales] = myTheme.contrastColors;

	scales.forEach((scale) => {
		const scaleName = scale.name;

		const originalConfig = scalesConfig.find((c) => c.name === scaleName);
		if (!originalConfig || !originalConfig.ratios) return;

		const keys = Object.keys(originalConfig.ratios);

		const group: W3CColorGroup = {};

		scale.values.forEach((swatch, index) => {
			const stepKey = keys[index] || (index + 1).toString();

			const token: W3CColorToken = {
				$value: swatch.value,
				$type: 'color',
				$description: `Contrast ratio: ${swatch.contrast}:1`,
			};

			group[stepKey] = token;
		});

		colorTokens.color[scaleName] = group;
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
