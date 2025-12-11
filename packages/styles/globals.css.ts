import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('html', {
	'@media': {
		// 'screen and (min-width: 768px)': {
		// 	margin: '20px', // Global style for screens 768px and wider
		// },
		'(prefers-color-scheme: dark)': {
			colorScheme: 'dark',
			// vars: {
			// //  ref: https://vanilla-extract.style/documentation/api/create-var/
			// 	[accentVar]: 'lightblue',
			// },
		},
	},
});

globalStyle('html, body', {
	maxWidth: '100vw',
	overflowX: 'hidden',
});

globalStyle('html', {
	// scrollBehavior: 'smooth', // #TODO: investigate - somehow smooth scroll-behavior is automatically added
	scrollPaddingTop: '4rem',
	// background: vars.colors.background,
	// color: vars.colors.text.normal,
	// background: `linear-gradient(${vars.colors.background}, #000)`,
	// color: vars.colors.text.normal,
	// backgroundColor: vars.colors.background,
	// colorScheme: 'dark',
	// WebkitFontSmoothing: 'antialiased',
	// MozOsxFontSmoothing: 'grayscale',

	'@media': {
		// 'screen and (min-width: 768px)': {
		// 	margin: '20px', // Global style for screens 768px and wider
		// },
		'(prefers-color-scheme: dark)': {
			colorScheme: 'dark',
			// vars: {
			// //  ref: https://vanilla-extract.style/documentation/api/create-var/
			// 	[accentVar]: 'lightblue',
			// },
		},
	},
});

globalStyle('body', {
	fontFamily:
		'var(--font-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
	minHeight: '100vh',
	// maxWidth: '500px',
	margin: '0px auto',
	// marginBottom: '2rem',
	// background: `linear-gradient(${vars.color.background}, #000)`,
	background: Object.values(vars.colors.background),
});

globalStyle('*', {
	boxSizing: 'border-box',
	padding: 0,
	margin: 0,
});

globalStyle('a', {
	color: 'inherit',
	textDecoration: 'none',
});

globalStyle('p', {
	color: vars.colors.text.normal,
	lineHeight: 1.8,
	marginBottom: '1rem',
	letterSpacing: '0.03ch',
});

globalStyle('ul', {
	color: vars.colors.text.normal,
	lineHeight: 1.8,
	margin: '1rem 0',
	listStyle: ['inside disc', 'disc'],
	padding: 'revert',
	paddingBottom: '1px',
});

globalStyle('li', {
	marginBottom: '0.5rem',
});
