import { tokens } from '@ds-starter/tokens';
import { style } from '@vanilla-extract/css';

// #region Padding

export const pSmall = style({
	padding: tokens.space.small,
});

export const pMedium = style({
	padding: tokens.space.medium,
});

export const pLarge = style({
	padding: tokens.space.large,
});

export const pxSmall = style({
	margin: `0 ${tokens.space.small}`,
});

export const pxMedium = style({
	margin: `0 ${tokens.space.medium}`,
});

export const pxLarge = style({
	margin: `0 ${tokens.space.large}`,
});

export const pySmall = style({
	margin: `${tokens.space.small} 0`,
});

export const pyMedium = style({
	margin: `${tokens.space.medium} 0`,
});

export const pyLarge = style({
	margin: `${tokens.space.large} 0`,
});

// #endregion

// #region Margin

export const mSmall = style({
	margin: tokens.space.small,
});

export const mMedium = style({
	margin: tokens.space.medium,
});

export const mLarge = style({
	margin: tokens.space.large,
});

export const mxSmall = style({
	margin: `0 ${tokens.space.small}`,
});

export const mxMedium = style({
	margin: `0 ${tokens.space.medium}`,
});

export const mxLarge = style({
	margin: `0 ${tokens.space.large}`,
});

export const mySmall = style({
	margin: `${tokens.space.small} 0`,
});

export const myMedium = style({
	margin: `${tokens.space.medium} 0`,
});

export const myLarge = style({
	margin: `${tokens.space.large} 0`,
});
// #endregion
