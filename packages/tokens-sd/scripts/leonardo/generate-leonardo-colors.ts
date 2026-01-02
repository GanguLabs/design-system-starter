import fs from 'node:fs';
import path from 'node:path';
import { createLeonardoTheme, TokenScaleConfig } from './leonardo-wrapper';

/**
 * Individual W3C Color Token leaf node (Inherits type from parent)
 */
interface W3CColorToken {
	$value: string;
	// $type: 'color';
	$description?: string;
}

/**
 * A group of tokens (e.g., 'neutral' or 'blue')
 */
interface W3CColorGroup {
	// Optional type here would apply to all tokens in this scale
	$type?: 'color';
	[step: string]: W3CColorToken | string | undefined;
}

/**
 * The root structure of the generated JSON
 */
interface W3CTokenExport {
	color: {
		$type: 'color'; // All nested tokens inherit this type
		[scaleName: string]: W3CColorGroup | string;
	};
}

// 1. Configuration - Easy to maintain and strictly typed
const SCALES_CONFIG: TokenScaleConfig[] = [
	{
		name: 'neutral',
		colorKeys: ['#ffffff'],
		// Using '0' as ratio 1 creates the base background anchor in the scale
		// Note that the 0 scale below still might generate different color than the one define above based on the lightness & contrast of the theme
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

interface ExportOptions {
	includeDescription?: boolean;
}

function generateTokens(
	options: ExportOptions = { includeDescription: false },
) {
	const theme = createLeonardoTheme(SCALES_CONFIG);

	// 1. Initialize with the inherited type at the top level
	const colorTokens: W3CTokenExport = {
		color: {
			$type: 'color', // Standard W3C: children inherit this type
		},
	};

	/**
	 * We destructure to skip the first element [0].
	 * Thanks to the workaround, the 'neutral' scale is duplicated in the scales array [1+],
	 * allowing us to capture '0', '10', '20', etc., in one pass.
	 */
	const [, ...scales] = theme.contrastColors;

	scales.forEach((scale) => {
		const scaleName = scale.name;
		const config = SCALES_CONFIG.find((c) => c.name === scaleName);
		if (!config || !config.ratios) return;

		const keys = Object.keys(config.ratios);
		const group: W3CColorGroup = {};

		scale.values.forEach((swatch, index) => {
			const stepKey = keys[index] || (index + 1).toString();

			// 2. Leaf nodes now only contain the value and metadata
			const token: W3CColorToken = {
				$value: swatch.value,
				// $type: 'color',
				// $description: `Contrast ratio: ${swatch.contrast}:1`,
			};

			// Add description ONLY if the toggle is enabled
			if (options.includeDescription) {
				token.$description = `Contrast: ${swatch.contrast}:1`;
			}

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

generateTokens({ includeDescription: false });
