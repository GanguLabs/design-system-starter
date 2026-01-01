import { transformGroups, transforms } from 'style-dictionary/enums';

export const tokensStudioTransforms = Object.freeze({
	resolveMath: 'ts/resolveMath',
	colorModifiers: 'ts/color/modifiers',
} as const); // 'as const' ensures types are the literal strings, not just 'string'
type TokensStudioValues =
	(typeof tokensStudioTransforms)[keyof typeof tokensStudioTransforms];
type TransformGroupName = keyof typeof transformGroups;
type TransformName = keyof typeof transforms;
type BuiltInTransformNames = (typeof transforms)[keyof typeof transforms];
type ExtendedTransformName =
	| BuiltInTransformNames
	| TokensStudioValues
	| (string & {}); // The & {} trick keeps the union from collapsing into just 'string';

export const customTransformGroups: Partial<
	Record<TransformGroupName, ExtendedTransformName[]>
> = {
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
};
