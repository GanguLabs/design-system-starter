import { tokens, tokensDark, tokensLight } from '@repo/tokens';
import {
	createGlobalTheme,
	createTheme,
	createThemeContract,
} from '@vanilla-extract/css';

// ref: https://nearform.com/digital-community/vanilla-extract/
// ref: https://samuelkraft.com/blog/vanilla-extract-with-next-themes

const root = createGlobalTheme(':root', {
	space: {
		small: tokens.space.small,
		medium: tokens.space.medium,
		large: tokens.space.large,
	},
	fonts: {
		heading: 'Georgia, Times, Times New Roman, serif',
		body: 'system-ui',
	},
});

const colors = createThemeContract({
	primary: null,
	secondary: null,
	background: {
		fallback: null, // fallback should be first
		token: null,
	},
	headerText: null,
	headerBackground: null,
	accent: null,
	text: {
		normal: null,
		dimmed: null,
	},
});

export const lightTheme = createTheme(colors, {
	primary: '#1E40AF',
	secondary: '#DB2777',
	background: {
		fallback: '#EFF6FF', // 'blue',
		token: tokensLight.color.background.regular,
	},
	headerBackground: '#222',
	headerText: '#fff',
	accent: '#080',
	text: {
		normal: '#1F2937',
		dimmed: '#6B7280',
	},
});

export const darkTheme = createTheme(colors, {
	primary: '#60A5FA',
	secondary: '#F472B6',
	background: {
		fallback: '#020817', // 'pink',
		token: tokensDark.color.background.regular,
	},
	headerBackground: '#222',
	headerText: '#fff',
	accent: '#080',
	text: {
		normal: '#F9FAFB',
		dimmed: '#D1D5DB',
	},
});

createGlobalTheme;
export const vars = { ...root, colors };
