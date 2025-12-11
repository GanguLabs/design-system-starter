import type { ThemeImages } from '@/components/themed-image';
import ThemedImage from '@/components/themed-image';
import type { Metadata } from 'next';
import darkModeImage from './dark-mode.jpg';
import lightModeImage from './light-mode.jpg';

export const metadata: Metadata = {
	title: 'Next Themes Demo',
	description: 'My tests and use-cases for next-themes in this app',
};

export default function NextThemesDemo() {
	const themedImageData: ThemeImages = {
		light: {
			src: lightModeImage,
			alt: 'Light mode image',
		},
		dark: {
			src: darkModeImage,
			alt: 'Dark mode Image',
		},
	};

	return (
		<div>
			{/* <Image src={darkModeImage} alt="dark image" /> */}
			<ThemedImage images={themedImageData} />
		</div>
	);
}
