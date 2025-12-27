import { ImageSource } from '@/components/media-query-image';
import Image from 'next/image';
import * as styles from './theme-image.css';

interface ThemeImageSourceData extends ImageSource {
	/** Load image with high priority (use for Hero images). Without priority, the browser would wait until the CSS is parsed, realize one image is display: none, and only then start downloading the visible one. By the time that happens, your LCP score has already suffered. With priority, the "ready-to-go" images are sitting in the browser cache before the browser even finishes reading your CSS. */
	priority?: boolean;
}

interface ThemeImageProps {
	light: ThemeImageSourceData;
	dark: ThemeImageSourceData;
}

export default function NextJsImagesThemed({ light, dark }: ThemeImageProps) {
	return (
		<div className={styles.container}>
			{/* We render both. The browser's CSS engine will hide/show 
         the correct one based on the <html> class instantly.
      */}
			<div className={styles.lightOnly}>
				<Image {...light} />
			</div>
			<div className={styles.darkOnly}>
				<Image {...dark} />
			</div>
		</div>
	);
}
