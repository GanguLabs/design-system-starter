import { tokens } from '@repo/tokens';

const theme = {
	...tokens,

	fontFamily: `${tokens.fontFamily.main}, ${tokens.fontFamily.fallback}`,
};

export { theme };

