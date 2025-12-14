import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import {
	logBrokenReferenceLevels,
	logVerbosityLevels,
	logWarningLevels,
} from 'style-dictionary/enums';

register(StyleDictionary);
const myStyleDictionary = new StyleDictionary({
	source: ['src/tokens/**/*.json'],
	preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
	log: {
		warnings: logWarningLevels.warn, // 'warn' | 'error' | 'disabled'
		verbosity: logVerbosityLevels.default, // 'default' | 'silent' | 'verbose'
		errors: {
			brokenReferences: logBrokenReferenceLevels.throw, // 'throw' | 'console'
		},
	},
	hooks: {
		transformGroups: {
			css: [
				'ts/resolveMath', // (Optional) Good for math in other tokens
				'ts/color/modifiers', // <--- CRITICAL: THIS is what handles lighten/darken, This reads your $extensions.studio.tokens.modify
				'attribute/cti',
				'color/hsl', // (Optional) If you want final output in HSL
				'name/kebab',
				'size/pxToRem',
			],
			// Create a custom group for SCSS to include the modifier
			scss: [
				'ts/resolveMath',
				'ts/color/modifiers', // <--- THIS is what handles lighten/darken
				'attribute/cti',
				'name/kebab',
			],
			// Create a custom group for JS/TS to include the modifier
			js: [
				'ts/resolveMath',
				'ts/color/modifiers', // <--- THIS is what handles lighten/darken
				'attribute/cti',
				'color/hsl', // (Optional) If you want final output in HSL
				'name/pascal',
			],
		},
	},
	platforms: {
		css: {
			transformGroup: 'css',
			buildPath: 'build/css/',
			files: [
				{
					destination: '_variables.css',
					format: 'css/variables',
				},
			],
		},
		scss: {
			transformGroup: 'scss',
			buildPath: 'build/scss/',
			files: [
				{
					destination: '_variables.scss',
					format: 'scss/map-deep',
					options: {
						mapName: 'ag-tokens',
					},
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
				{
					format: 'javascript/module',
					destination: 'colors.js',
				},
				{
					format: 'typescript/module-declarations',
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
await myStyleDictionary.buildAllPlatforms();
