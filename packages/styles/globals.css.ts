import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('body', {
	fontFamily:
		'var(--font-sans), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
	minHeight: '100vh',
	// maxWidth: '500px',
	margin: '0px auto',
	// marginBottom: '2rem',
	// background: `linear-gradient(${vars.color.background}, #000)`,
	background: vars.colors.background,
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
