import { paletteDark, paletteLight, paletteVars } from './palette';

import { makeDetailsTokens } from './details';

import { default as content } from './content';
import { default as details } from './details';
import { default as sizes } from './sizes';

export type * from './content';
export type * from './details';
export type * from './palette';
export type * from './sizes';

export const tokens = {
  color: paletteVars,

  ...content,
  ...sizes,
  ...details,
};

export const tokensLight = {
  color: paletteLight,

  ...content,
  ...sizes,
  ...makeDetailsTokens(paletteLight),
};

export const tokensDark = {
  color: paletteDark,

  ...content,
  ...sizes,
  ...makeDetailsTokens(paletteDark),
};
