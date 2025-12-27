'use client';

import { useTheme } from 'next-themes';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { ReactNode } from 'react';

type ImageData = {
	src: string | StaticImageData;
	alt: string;
	width?: number;
	height?: number;
};

export type ThemeImages = {
	light: ImageData;
	dark: ImageData;
};
interface ThemeImageProps {
	children?: ReactNode;
	images: ThemeImages;
}

/**
 * @deprecated
 * Change image based on theme using next-themes
 * * ref: https://www.npmjs.com/package/next-themes
 */
export default function NextThemedImage({
	children,
	images,
	...props
}: ThemeImageProps) {
	const { resolvedTheme } = useTheme();
	let src: ImageData;

	switch (resolvedTheme) {
		case 'light':
			src = images.light;
			break;
		case 'dark':
			src = images.dark;
			break;
		default:
			src = {
				src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO 9TXL0Y4OHwAAAABJRU5ErkJggg==',
				alt: 'tiny red dot',
				width: 400,
				height: 200,
			};
			break;
	}

	return <Image {...src} />;
}
