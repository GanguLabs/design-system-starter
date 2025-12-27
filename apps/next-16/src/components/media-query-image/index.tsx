import { getImageProps, ImageProps, StaticImageData } from 'next/image';

/**
 * Predefined media query aliases for common breakpoints and themes.
 */
type Breakpoints = {
	mobile: string;
	tablet: string;
	desktop: string;
	/**
	 * @deprecated dark mode only works with media queries
	 */
	dark: string;
};

const QUERIES: Breakpoints = {
	mobile: '(max-width: 639px)',
	tablet: '(min-width: 640px)',
	desktop: '(min-width: 1024px)',
	dark: '(prefers-color-scheme: dark), [data-theme="dark"]',
};

/**
 * Represents an image source with its specific dimensions and media condition.
 */
interface ImageSource {
	/** The path to the image asset */
	src: string | StaticImageData;
	/** The alt text is required for accessibility */
	alt: string;
	/** The intrinsic width of this specific source */
	width?: number;
	/** The intrinsic height of this specific source */
	height?: number;
	/** * Required for alternative sources, but optional for the default fallback.
	 * A key from predefined breakpoints OR
	 * * A custom CSS media query string. For Example:
	 *	   * `media: '(orientation: landscape)'`
	 *	   * `media: '(prefers-contrast: more)'`
	 *	   * `media: 'print'`
	 */
	media?: keyof Breakpoints | (string & {});
}

interface MediaQueryImageProps
	extends Omit<ImageProps, 'src' | 'width' | 'height' | 'alt'> {
	/** The primary/fallback image source used when no media queries match */
	defaultSource: ImageSource;
	/** Array of additional sources for art direction (e.g., different crops or dark mode) */
	sources?: ImageSource[];
}

/**
 * A Next.js optimized component using the HTML `<picture>` element.
 * It manages multiple image sources for theme switching or responsive art direction.
 * ref: https://stackoverflow.com/a/78959852/6908282
 * @example
 * ```tsx
 * <MediaQueryImage
 * defaultSource={{ src: '/light-mode.png', alt: 'alt text default', width: 1200, height: 800 }}
 * sources={[
 * 	      { src: '/dark-mode.png', alt: 'alt text dark', media: 'dark', width: 1200, height: 800 }
 *     ]}
 * />
 * ```
 */
export default function MediaQueryImage({
	defaultSource,
	sources = [],
	className,
	...rest
}: MediaQueryImageProps) {
	/**
	 * Generate props for the default fallback <img> tag.
	 */
	const {
		props: { srcSet: _, ...imgProps },
	} = getImageProps({
		...rest,
		src: defaultSource.src,
		width: defaultSource.width ?? (defaultSource.src as StaticImageData).width,
		height:
			defaultSource.height ?? (defaultSource.src as StaticImageData).height,
		alt: defaultSource.alt,
	});

	return (
		<picture className={className}>
			{sources.map((source, index) => {
				/**
				 * Generate optimized srcSet for each alternative source.
				 */
				const {
					props: { srcSet },
				} = getImageProps({
					...rest,
					src: source.src,
					alt: source.alt,
					width: source.width ?? (source.src as StaticImageData).width,
					height: source.height ?? (source.src as StaticImageData).height,
				});

				// Resolve the media query from the alias map or use the raw string.
				const mediaQuery = source.media
					? QUERIES[source.media as keyof Breakpoints] ?? source.media
					: undefined;

				return mediaQuery ? (
					<source key={index} media={mediaQuery} srcSet={srcSet} />
				) : null;
			})}

			<img
				{...imgProps}
				style={{ width: '100%', height: 'auto', display: 'block' }}
			/>
		</picture>
	);
}

export type { Breakpoints, ImageSource };
