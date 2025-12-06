import type { Metadata, Viewport } from 'next';
import { Inter as FontSans, Geist, Geist_Mono } from 'next/font/google';
import { siteConfig } from '../../config/site';

import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	// this add the html `<head/>` element
	// ref: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
	title: {
		default: 'Anwesh Gangula',
		template: '%s | Anwesh Gangula',
	},
	description: '3D, WebGL & Meta enthusiast',
	// applicationName: "Anwesh Gangula",
	authors: [
		{
			name: 'Anwesh Gangula',
			url: 'https://anweshgangula.com/',
		},
	],
	generator: 'nextjs, react, blog',
	// colorScheme: constants.defaultTheme,
	// themeColor: constants.themeColorMetaDark,
};

export const viewport: Viewport = {
	// themeColor: [
	// 	// TODO: currently this is dynamically handled using useEffect in ThemeSwitcher component
	// 	{
	// 		media: '(prefers-color-scheme: light)',
	// 		color: tokensLight.color.background.regular,
	// 	},
	// 	{
	// 		media: '(prefers-color-scheme: dark)',
	// 		color: tokensDark.color.background.regular,
	// 	},
	// ],
	width: 'device-width',
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
	// viewport-fit: "cover" // this is default to cover in nextjs
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${fontSans.variable} ${geistSans.variable} ${geistMono.variable}`}
			>
				{children}
			</body>
		</html>
	);
}
