import path from 'node:path';
import { formats } from 'style-dictionary/enums';
import type { PlatformConfig } from 'style-dictionary/types';
import { buildFolder } from './sd-utils.ts';

export const getPlatforms = (
	filesToUse: string[],
	defaultOptions: any,
): Record<string, PlatformConfig> => ({
	css: {
		transformGroup: 'css',
		buildPath: buildFolder('css'),
		// files: [{ destination: '_variables.css', format: formats.cssVariables }],
		files: filesToUse.map((file) => {
			const relativeFilePath = path
				.relative('src/tokens', file)
				.replace(/\\/g, '/');
			// console.log({ relativeFilePath });
			return {
				// destination: relativeFilePath
				// 	.replace('.json', '.css')
				// 	.replace('.tokens', '.css'),
				destination: relativeFilePath.replace(/\.(json|tokens)$/, '.css'),
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
					...defaultOptions,
					// selector: '.my-css-class',
					outputReferences: !file.includes('base'),
				},
			};
		}),
	},
	scss: {
		transformGroup: 'scss',
		buildPath: buildFolder('scss'),
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
	// 	buildPath: buildFolder('js'),
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
		buildPath: buildFolder('ts'),
		files: [
			{ format: formats.javascriptModule, destination: 'tokens.js' },
			{
				format: formats.typescriptModuleDeclarations,
				destination: 'tokens.d.ts',
			},
		],
	},
	tsTypeSafe: {
		transformGroup: 'js',
		buildPath: buildFolder('ts-type-safe'),
		files: [{ format: 'typescript/const-object', destination: 'tokens.ts' }],
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
});
