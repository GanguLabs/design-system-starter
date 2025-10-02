'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
	// ref: https://samuelkraft.com/blog/vanilla-extract-with-next-themes
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

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
