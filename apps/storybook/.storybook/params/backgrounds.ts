import { tokensDark, tokensLight } from '@repo/tokens';

export const backgrounds = {
	default: 'dark',
	values: [
		{
			name: 'light',
			value: tokensLight.color.background.subtle,
		},
		{
			name: 'dark',
			value: tokensDark.color.background.subtle,
		},
	],
};
