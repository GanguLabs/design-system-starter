import MediaQueryImage, { ImageSource } from '@/components/media-query-image';
import { ComponentProps } from 'react';

interface ThemeImageProps
	extends Omit<
		ComponentProps<typeof MediaQueryImage>,
		'sources' | 'defaultSource' | 'alt'
	> {
	/** The image configuration for Light Mode (serves as the default fallback) */
	light: ImageSource;
	/** The image configuration for Dark Mode */
	dark: ImageSource;
}

/**
 * A specialized wrapper around ResponsiveImage specifically for
 * toggling between Light and Dark mode assets.
 * @deprecated - [it only works with media queries. Doesn't work with Theme-switcher]
 * @example
 * ```tsx
 * <ThemeColorSchemeImage
 *     light={{ src: '/charts/light.png', width: 800, height: 400 }}
 *     dark={{ src: '/charts/dark.png', width: 800, height: 400 }}
 * />
 * ```
 */
export default function ThemeColorSchemeImage({
	light,
	dark,
	...rest
}: ThemeImageProps) {
	return (
		<MediaQueryImage
			{...rest}
			// We set light as the default fallback
			defaultSource={light}
			// We inject the "dark" media query automatically
			sources={[
				{
					...dark,
					media: 'dark',
				},
			]}
		/>
	);
}
