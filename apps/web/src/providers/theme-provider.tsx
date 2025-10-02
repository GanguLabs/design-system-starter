'use client';
// ref: https://ui.shadcn.com/docs/dark-mode/next

import {
	ThemeProviderProps as NextThemeProviderProps,
	ThemeProvider as NextThemesProvider,
} from 'next-themes';

export function ThemeProvider({ children, ...props }: NextThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
