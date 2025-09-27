import { style } from '@vanilla-extract/css';

export const grid = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '1rem',
});

export const hero = style({
	display: 'grid',
	gridColumn: '1/-1' /* full width */,
	/* height: 400px; */
	gridTemplateColumns: '1fr 1fr minmax(auto, 700px) 1fr',
	columnGap: '16px',
	flexWrap: 'wrap',
	position: 'relative',
	alignItems: 'center',
	justifyContent: 'center',
	/* text-align: center; */
	minHeight: 'calc(50vh)',
	/* max-height: calc(100vh - 100px); */
});

export const gradientText = style({
	display: 'inline-block',
	color: 'transparent',
	// background: '-webkit-linear-gradient(var(--gradient2))',
	background: 'linear-gradient(var(--gradient2))',
	backgroundSize: '400% 100%',
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	vars: {
		'--gradient1':
			'74deg , #4285f4 0 , #9b72cb 9% , #d96570 20% , #d96570 24% , #9b72cb 35% , #4285f4 44% , #9b72cb 50% , #d96570 56% , #131314 75% , #131314 100%',
		'--gradient2':
			'to right top , #d16ba5 , #c777b9 , #ba83ca , #aa8fd8 , #9a9ae1 , #8aa7ec , #79b3f4 , #69bff8 , #52cffe , #41dfff , #46eefa , #5ffbf1',
	},
});
