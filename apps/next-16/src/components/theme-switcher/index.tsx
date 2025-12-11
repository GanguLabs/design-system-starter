'use client';

import { tokensDark, tokensLight } from '@repo/tokens';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
	// ref: https://samuelkraft.com/blog/vanilla-extract-with-next-themes
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	useEffect(() => {
		// TODO: This should ideally be handled using nextjs genrateViewport. But it's a known issue
		// ref: https://github.com/pacocoursey/next-themes/issues/78#issuecomment-1674109200
		let themeColorMeta = document.querySelector(
			'meta[name="theme-color"]'
		) as HTMLMetaElement;
		let colorSchemeMeta = document.querySelector(
			'meta[name="color-scheme"]'
		) as HTMLMetaElement;

		if (themeColorMeta === null || colorSchemeMeta === null) {
			themeColorMeta = document.createElement('meta');
			colorSchemeMeta = document.createElement('meta');
			themeColorMeta.name = 'theme-color';
			colorSchemeMeta.name = 'color-scheme';
			document.head.appendChild(themeColorMeta);
			document.head.appendChild(colorSchemeMeta);
		}

		if (theme === 'dark') {
			themeColorMeta.content = tokensDark.color.background.regular;
			colorSchemeMeta.content = 'dark';
		} else {
			themeColorMeta.content = tokensLight.color.background.regular;
			colorSchemeMeta.content = 'light';
		}
	}, [theme]);

	if (!mounted) return null;

	return (
		<div>
			Theme:
			<select value={theme} onChange={(e) => setTheme(e.target.value)}>
				<option value="system">System</option>
				<option value="light">Light</option>
				<option value="dark">Dark</option>
			</select>
		</div>
	);
};

export default ThemeSwitcher;
