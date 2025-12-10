import { style } from '@vanilla-extract/css';

export const htmlMainStyles = style({
	margin: 'auto',
	overflow: 'auto',
	padding: '1rem',
	display: 'grid',
	gridTemplateColumns: '1fr minmax(auto, 700px) 1fr',
});
