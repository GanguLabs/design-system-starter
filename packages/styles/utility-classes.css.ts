import { tokens } from '@ds-starter/tokens';
import { style } from '@vanilla-extract/css';

// #region Padding
export const pNone = style({
	padding: 0,
});

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

export const mNone = style({
	margin: 0,
});

export const mAuto = style({
	margin: 'auto',
});

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

// #region Display

export const dBlock = style({
	display: 'block',
});

export const dInlineBlock = style({
	display: 'inline-block',
});

export const dInline = style({
	display: 'inline',
});

export const dFlex = style({
	display: 'flex',
});

export const dInlineFlex = style({
	display: 'inline-flex',
});

export const dGrid = style({
	display: 'grid',
});

export const dInlineGrid = style({
	display: 'inline-grid',
});

// #endregion

// #region Flexbox

export const flexRow = style({
	flexDirection: 'row',
});

export const flexRowReverse = style({
	flexDirection: 'row-reverse',
});

export const flexColumn = style({
	flexDirection: 'column',
});

export const flexColumnReverse = style({
	flexDirection: 'column-reverse',
});

export const flexWrap = style({
	flexWrap: 'wrap',
});

export const flexWrapReverse = style({
	flexWrap: 'wrap-reverse',
});

export const flexNoWrap = style({
	flexWrap: 'nowrap',
});

export const justifyStart = style({
	justifyContent: 'flex-start',
});

export const justifyEnd = style({
	justifyContent: 'flex-end',
});

export const justifyCenter = style({
	justifyContent: 'center',
});

export const justifyBetween = style({
	justifyContent: 'space-between',
});

export const justifyAround = style({
	justifyContent: 'space-around',
});

export const justifyEvenly = style({
	justifyContent: 'space-evenly',
});

export const alignItemsStart = style({
	alignItems: 'flex-start',
});

export const alignItemsEnd = style({
	alignItems: 'flex-end',
});

export const alignItemsCenter = style({
	alignItems: 'center',
});

export const alignItemsStretch = style({
	alignItems: 'stretch',
});

export const alignItemsBaseline = style({
	alignItems: 'baseline',
});

export const alignContentStart = style({
	alignContent: 'flex-start',
});

export const alignContentEnd = style({
	alignContent: 'flex-end',
});

export const alignContentCenter = style({
	alignContent: 'center',
});

export const alignContentStretch = style({
	alignContent: 'stretch',
});

export const alignContentBetween = style({
	alignContent: 'space-between',
});

export const alignContentAround = style({
	alignContent: 'space-around',
});

export const flexGrow = style({
	flexGrow: 1,
});

export const flexShrink = style({
	flexShrink: 1,
});

export const flexAuto = style({
	flex: '1 1 auto',
});

export const flexNoGrow = style({
	flexGrow: 0,
});

export const flexNoShrink = style({
	flexShrink: 0,
});

// #endregion
