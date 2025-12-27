import { agTheme } from '@repo/styles/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const container = style({
	// position: 'relative',
	display: 'inline-block',
	width: '100%',
});

export const lightOnly = style({
	display: 'block',
});

export const darkOnly = style({
	display: 'none',
});

// Automatically react to the .dark class injected by next-themes on the <html> tag
globalStyle(`html.${agTheme.dark} ${lightOnly}`, {
	display: 'none',
});

globalStyle(`html.${agTheme.dark} ${darkOnly}`, {
	display: 'block',
});

// // If you use data-attribute in next-theme for toggling themes
// // Commenting this because, its not possible to use data-attribute properly with vanilla extract and next-themes
// globalStyle(`html[data-theme='dark'] ${lightOnly}`, {
// 	display: 'none',
// });

// globalStyle(`html[data-theme='dark'] ${darkOnly}`, {
// 	display: 'block',
// });
