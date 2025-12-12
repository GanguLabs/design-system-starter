'use client';
// ref: https://ui.shadcn.com/docs/dark-mode/next
// ref: https://github.com/shadcn-ui/ui/issues/6757#issuecomment-3354607187

import type { ThemeProviderProps as NextThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';

const NextThemesProvider = dynamic(
	() => import('next-themes').then((e) => e.ThemeProvider),
	{
		ssr: false,
	}
);

export function ThemeProvider({ children, ...props }: NextThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
