import { register } from '@tokens-studio/sd-transforms';
import { globSync } from 'glob';
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

const tokenFiles = globSync('src/tokens/**/*.{json,tokens}', {
	posix: true,
	// dotRelative: true,
});
// const tokenFiles = globSync('src/tokens/1-base/*.json', {
// 	posix: true,
// 	// dotRelative: true,
// });
// const tokenFilesAwait = await glob('src/tokens/**/*.{json,tokens}');

// console.log({ tokenFiles });
const mySd = new StyleDictionary({
	// source: ['src/tokens/**/*.json', 'src/tokens/**/*.tokens'],
	source: tokenFiles,
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
			files: tokenFiles.map((file) => {
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
						outputReferences: file.includes('semantic'),
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
