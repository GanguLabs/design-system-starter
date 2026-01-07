import { LeonardoThemeWrapper } from '@repo/leonardo-contrast-colors';
import fs from 'node:fs';
import path from 'node:path';
import { W3CColorGroup, W3CColorToken, W3CTokenExport } from './models/tokens';
import { allScales, neutral } from './tokens/base';
import { semanticDefinitions } from './tokens/semantic';

interface ExportOptions {
	includeDescription?: boolean;
}

function build(options: ExportOptions = { includeDescription: false }) {
	// 1. Initialize Wrapper & Get Normalized Data
	const wrapper = new LeonardoThemeWrapper(allScales, neutral, 100);
	const normalizedData = wrapper.getNormalizedScales();

	// 2. Generate Global Tokens (Hex values)
	const globalExport: W3CTokenExport = { color: { $type: 'color' } };

	normalizedData.forEach((scale) => {
		const group: W3CColorGroup = {};
		scale.swatches.forEach((swatch) => {
			group[swatch.key] = {
				$value: swatch.value,
				...(options.includeDescription && {
					$description: `Contrast: ${swatch.contrast}:1`,
				}),
			};
		});
		if (globalExport.color) globalExport.color[scale.colorName] = group;
	});

	// 3. Generate Semantic Tokens (References)
	const semanticGroup = { $type: 'color' as const } as NonNullable<
		W3CTokenExport['semantic']
	>;

	Object.entries(semanticDefinitions).forEach(([tokenName, tokenData]) => {
		const token: W3CColorToken = { $value: tokenData.$value };

		if (options.includeDescription && tokenData.$description) {
			token.$description = tokenData.$description;
		}

		semanticGroup[tokenName] = token;
	});

	const semanticExport: W3CTokenExport = { semantic: semanticGroup };

	// 4. Write to Files
	const dist = path.resolve(
		process.cwd(),
		'src/tokens/0-primitives/colors/leonardo',
	);

	if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

	fs.writeFileSync(
		path.join(dist, 'base.json'),
		stringifyW3C(globalExport),
		'utf-8',
	);

	fs.writeFileSync(
		path.join(dist, 'semantic.json'),
		stringifyW3C(semanticExport),
		'utf-8',
	);

	console.log(
		'✅ W3C Tokens generated including Background anchor and Neutral surfaces.',
	);
}

/**
 * Custom stringifier to collapse single-value tokens into one line.
 * It ignores objects that have extra properties like $description.
 */
function stringifyW3C(data: any): string {
	// 1. Generate standard pretty-printed JSON
	const json = JSON.stringify(data, null, 2);

	// 2. Regex breakdown:
	// \{              -> Match opening brace
	// \s+             -> Match the newline and indentation
	// "\$value":\s+   -> Match "$value": and its following space
	// "[^"]+"         -> Match the hex code (the value)
	// \s+             -> Match the newline and indentation before closing
	// \}              -> Match closing brace
	return json.replace(
		/\{\s+"\$value":\s+"([^"]+)"\s+\}/g,
		'{ "$value": "$1" }',
	);
}

build({ includeDescription: false });
