// apps/docs/hooks/useAdaptiveTheme.ts
'use client';
import {
	BackgroundColorScale,
	ColorScale,
	LeonardoThemeWrapper,
} from '@repo/leonardo-contrast-colors';
import { useEffect, useMemo, useState } from 'react';

export function useAdaptiveTheme() {
	const [lightness, setLightness] = useState(100);
	const [contrast, setContrast] = useState(1);

	// 1. Define your scales (just like the demo)
	const scales = useMemo(() => {
		const gray = new BackgroundColorScale({
			name: 'gray',
			colorKeys: ['#000000', '#ffffff'],
			ratios: { bg: 1, text: 4.5, accent: 7 },
		});

		const blue = new ColorScale({
			name: 'blue',
			colorKeys: ['#0000ff'],
			ratios: { low: 3, high: 4.5 },
		});

		return { gray, blue };
	}, []);

	// 2. Initialize your Wrapper
	const wrapper = useMemo(() => {
		return new LeonardoThemeWrapper(
			[scales.blue, scales.gray],
			scales.gray,
			lightness
		);
	}, [scales, lightness]);

	// 3. Apply CSS variables to a container or :root
	useEffect(() => {
		const normalized = wrapper.getNormalizedScales();
		const root = document.documentElement;

		// Apply background
		root.style.setProperty('--app-bg', wrapper.bac);

		// Apply all scale swatches
		normalized.forEach((scale) => {
			scale.swatches.forEach((swatch) => {
				root.style.setProperty(
					`--${scale.colorName}-${swatch.key}`,
					swatch.value
				);
			});
		});
	}, [wrapper]);

	return { lightness, setLightness, contrast, setContrast, wrapper };
}
