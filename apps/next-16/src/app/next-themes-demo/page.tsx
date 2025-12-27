import ThemedImage from '@/components/themed-image';
import type { ThemeImages } from '@/components/themed-image/next-themes';
import { vars } from '@repo/styles/theme.css';
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
			<div>
				<h3>Colors</h3>
				<ul>
					<li>
						<p>
							Primary <span style={{ color: vars.colors.primary }}>color</span>
						</p>
					</li>
					<li>
						<p>
							Secondary{' '}
							<span style={{ color: vars.colors.secondary }}>color</span>
						</p>
					</li>
				</ul>
			</div>
			<div>
				<h3>Theme based Images (Nextjs + Vanilla Extract + Next-Themes)</h3>
				<ThemedImage.NextJsImagesThemed
					light={{
						src: lightModeImage,
						alt: 'alt text light',
						// width: 800,
						// height: 400,
					}}
					dark={{
						src: darkModeImage,
						alt: 'alt text dark',
						// width: 800,
						// height: 400,
					}}
				/>
			</div>
			<div>
				<h3>Theme based Images (Next-Themes)</h3>
				<ThemedImage.NextThemed images={themedImageData} />
			</div>
			<div>
				<h3>Theme based Images (Media Queries)</h3>
				<ThemedImage.ThemeColorScheme
					light={{
						src: lightModeImage,
						alt: 'alt text light',
						width: 800,
						height: 400,
					}}
					dark={{
						src: darkModeImage,
						alt: 'alt text dark',
						width: 800,
						height: 400,
					}}
				/>
			</div>
		</div>
	);
}
