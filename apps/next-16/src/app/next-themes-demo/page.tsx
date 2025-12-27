import type { ThemeImages } from '@/components/themed-image/next-themes';
import NextThemedImage from '@/components/themed-image/next-themes';
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
				<h3>Theme based Images</h3>
				<NextThemedImage images={themedImageData} />
			</div>
		</div>
	);
}
