import { register } from '@tokens-studio/sd-transforms';
import { globSync } from 'glob';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';
// prettier-ignore
import { formats, logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels, transforms } from 'style-dictionary/enums';

register(StyleDictionary);

const tokensStudioTransforms = Object.freeze({
	resolveMath: 'ts/resolveMath',
	colorModifiers: 'ts/color/modifiers',
});

// const tokensFolder = 'src/tokens';
// const tokenFiles = [
// 	// 'src/tokens/2-semantic/z-index.json',
// 	'src/tokens/2-semantic/text.json',
// 	// 'src/tokens/2-semantic/object-values.json',
// 	// 'src/tokens/2-semantic/content.json',
// 	'src/tokens/1-base/dimensions.json',
// 	'src/tokens/1-base/colors.json',
// 	'src/tokens/3-component/button.json',
// ];
// const tokenFiles = fs
// 	.readdirSync(tokensFolder)
// 	.filter((file) => file.endsWith('.json') || file.endsWith('.tokens'));

const allTokenFiles = globSync('src/tokens/**/*.{json,tokens}', {
	posix: true,
	// dotRelative: true,
});
// const tokenFiles = globSync('src/tokens/1-base/*.json', {
// 	posix: true,
// 	// dotRelative: true,
// });
// const tokenFilesAwait = await glob('src/tokens/**/*.{json,tokens}');

/** Remove empty json files without any tokens */
const nonEmptyJsonFiles = allTokenFiles.filter((filePath) => {
	try {
		// Get file statistics synchronously
		const stats = statSync(filePath);
		// Return true if the file size is greater than 0 bytes
		if (stats.size == 0) {
			return false;
		}

		const content = readFileSync(filePath, 'utf-8');

		if (content.trim().length === 0) {
			// Check if the file is empty (e.g., has a length of 0)
			return false;
		}

		// Attempt to parse the JSON content
		const jsonObject = JSON.parse(content);

		if (typeof jsonObject === 'object' && jsonObject !== null) {
			// Check if the parsed object is an empty object or an empty array
			// Check for empty object {} or empty array []
			if (
				Object.keys(jsonObject).length === 0 &&
				Array.isArray(jsonObject) === false
			) {
				return false;
			}
			if (Array.isArray(jsonObject) && jsonObject.length === 0) {
				return false;
			}
		}

		// If not empty, include it in the filtered list
		return true;
	} catch (error) {
		// Handle potential JSON parsing errors (e.g., malformed JSON)
		console.error(`Error processing file ${filePath}: ${error.message}`);
		return false; // Exclude files with errors
	}
});

const filesToUse = nonEmptyJsonFiles; // allTokenFiles;
// console.log({ tokenFiles });
const mySd = new StyleDictionary({
	// source: ['src/tokens/**/*.json', 'src/tokens/**/*.tokens'],
	source: filesToUse,
	// source: tokenFilesAwait,
	preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
	log: {
		warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
		verbosity: logVerbosityLevels.verbose, // 'default' | 'silent' | 'verbose'
		errors: {
			brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
		},
	},
	hooks: {
		transformGroups: {
			css: [
				tokensStudioTransforms.resolveMath, // (Optional) Good for math in other tokens
				tokensStudioTransforms.colorModifiers, // <--- CRITICAL: THIS is what handles lighten/darken, This reads your $extensions.studio.tokens.modify
				transforms.attributeCti,
				transforms.colorHsl, // (Optional) If you want final output in HSL
				transforms.nameKebab,
				transforms.sizePxToRem,
			],
			// Create a custom group for SCSS to include the modifier
			scss: [
				tokensStudioTransforms.resolveMath,
				tokensStudioTransforms.colorModifiers, // <--- THIS is what handles lighten/darken
				transforms.attributeCti,
				transforms.nameKebab,
			],
			// Create a custom group for JS/TS to include the modifier
			js: [
				tokensStudioTransforms.resolveMath,
				tokensStudioTransforms.colorModifiers, // <--- THIS is what handles lighten/darken
				transforms.attributeCti,
				transforms.colorHsl, // (Optional) If you want final output in HSL
				transforms.namePascal,
			],
		},
	},
	platforms: {
		css: {
			transformGroup: 'css',
			buildPath: 'build/css/',
			// files: [{ destination: '_variables.css', format: formats.cssVariables }],
			files: filesToUse.map((file) => {
				const relativeFilePath = path
					.relative('src/tokens', file)
					.replace(/\\/g, '/');
				console.log({ relativeFilePath });
				return {
					destination: relativeFilePath
						.replace('.json', '.css')
						.replace('.tokens', '.css'),
					format: formats.cssVariables,
					filter: async (token, options) => {
						// console.log({
						// 	options,
						// 	// token,
						// 	// // // tokenKey: token.key,
						// 	// // // tokenFilePath: token.filePath,
						// 	// // relativeFilePath,
						// 	// file,
						// });
						return token.filePath.endsWith(relativeFilePath);
					},
					options: {
						showFileHeader: true,
						// selector: '.abc',
						outputReferences: !file.includes('base'),
					},
				};
			}),
		},
		scss: {
			transformGroup: 'scss',
			buildPath: 'build/scss/',
			files: [
				{
					destination: '_variables.scss',
					format: formats.scssMapDeep,
					options: { mapName: 'ag-tokens' },
				},
			],
		},
		// js: {
		// 	transformGroup: 'js',
		// 	buildPath: 'build/js/',
		// 	files: [
		// 		{
		// 			format: 'javascript/esm',
		// 			destination: 'colors.js',
		// 			options: {
		// 				minify: true,
		// 			},
		// 		},
		// 	],
		// },
		ts: {
			transformGroup: 'js',
			buildPath: 'build/ts/',
			files: [
				{ format: formats.javascriptModule, destination: 'colors.js' },
				{
					format: formats.typescriptModuleDeclarations,
					destination: 'colors.d.ts',
				},
			],
		},

		// android: {
		// 	transformGroup: 'android',
		// 	buildPath: 'build/android/',
		// 	files: [
		// 		{
		// 			destination: 'font_dimens.xml',
		// 			format: 'android/fontDimens',
		// 		},
		// 		{
		// 			destination: 'colors.xml',
		// 			format: 'android/colors',
		// 		},
		// 	],
		// },
		// compose: {
		// 	transformGroup: 'compose',
		// 	buildPath: 'build/compose/',
		// 	files: [
		// 		{
		// 			destination: 'StyleDictionaryColor.kt',
		// 			format: 'compose/object',
		// 			options: {
		// 				className: 'StyleDictionaryColor',
		// 				packageName: 'StyleDictionaryColor',
		// 			},
		// 			filter: {
		// 				$type: 'color',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionarySize.kt',
		// 			format: 'compose/object',
		// 			options: {
		// 				className: 'StyleDictionarySize',
		// 				packageName: 'StyleDictionarySize',
		// 				type: 'float',
		// 			},
		// 			filter: {
		// 				$type: 'dimension',
		// 			},
		// 		},
		// 	],
		// },
		// ios: {
		// 	transformGroup: 'ios',
		// 	buildPath: 'build/ios/',
		// 	files: [
		// 		{
		// 			destination: 'StyleDictionaryColor.h',
		// 			format: 'ios/colors.h',
		// 			options: {
		// 				className: 'StyleDictionaryColor',
		// 				type: 'StyleDictionaryColorName',
		// 			},
		// 			filter: {
		// 				$type: 'color',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionaryColor.m',
		// 			format: 'ios/colors.m',
		// 			options: {
		// 				className: 'StyleDictionaryColor',
		// 				type: 'StyleDictionaryColorName',
		// 			},
		// 			filter: {
		// 				$type: 'color',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionarySize.h',
		// 			format: 'ios/static.h',
		// 			options: {
		// 				className: 'StyleDictionarySize',
		// 				type: 'float',
		// 			},
		// 			filter: {
		// 				$type: 'dimension',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionarySize.m',
		// 			format: 'ios/static.m',
		// 			options: {
		// 				className: 'StyleDictionarySize',
		// 				type: 'float',
		// 			},
		// 			filter: {
		// 				$type: 'dimension',
		// 			},
		// 		},
		// 	],
		// },
		// 'ios-swift': {
		// 	transformGroup: 'ios-swift',
		// 	buildPath: 'build/ios-swift/',
		// 	files: [
		// 		{
		// 			destination: 'StyleDictionary+Class.swift',
		// 			format: 'ios-swift/class.swift',
		// 			options: {
		// 				className: 'StyleDictionaryClass',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionary+Enum.swift',
		// 			format: 'ios-swift/enum.swift',
		// 			options: {
		// 				className: 'StyleDictionaryEnum',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionary+Struct.swift',
		// 			format: 'ios-swift/any.swift',
		// 			options: {
		// 				className: 'StyleDictionaryStruct',
		// 				imports: 'SwiftUI',
		// 				objectType: 'struct',
		// 				accessControl: 'internal',
		// 			},
		// 		},
		// 	],
		// },
		// 'ios-swift-separate-enums': {
		// 	transformGroup: 'ios-swift-separate',
		// 	buildPath: 'build/ios-swift/',
		// 	files: [
		// 		{
		// 			destination: 'StyleDictionaryColor.swift',
		// 			format: 'ios-swift/enum.swift',
		// 			options: {
		// 				className: 'StyleDictionaryColor',
		// 			},
		// 			filter: {
		// 				$type: 'color',
		// 			},
		// 		},
		// 		{
		// 			destination: 'StyleDictionarySize.swift',
		// 			format: 'ios-swift/enum.swift',
		// 			options: {
		// 				className: 'StyleDictionarySize',
		// 			},
		// 			filter: {
		// 				$type: 'dimension',
		// 			},
		// 		},
		// 	],
		// },
	},
});

/**
 * Clean and Build All Platforms
 * @param {StyleDictionary} sd The first number.
 */
async function cleanAndBuild(sd) {
	console.log('\n------------------\nCleaning platforms...');
	await sd.cleanAllPlatforms(); // Removes previous build files

	console.log('\n------------------\nBuilding platforms...');
	await sd.buildAllPlatforms(); // Generates new files
	console.log('\n------------------\nBuild complete!\n------------------\n');
}
await cleanAndBuild(mySd);
