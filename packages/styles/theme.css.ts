import { tokens } from '@ds-starter/tokens';
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
	background: null,
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
	background: '#EFF6FF',
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
	background: '#1F2937',
	headerBackground: '#222',
	headerText: '#fff',
	accent: '#080',
	text: {
		normal: '#F9FAFB',
		dimmed: '#D1D5DB',
	},
});

export const vars = { ...root, colors };
