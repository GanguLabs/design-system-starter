import HtmlMain from '@/components/html-main/html-main';
import ThemeSwitcher from '@/components/theme-switcher';
import { ThemeProvider } from '@/providers/theme-provider';
import { container, navBar } from '@repo/styles/header.css';
import { agTheme } from '@repo/styles/theme.css';
import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Inter as InterFontSans } from 'next/font/google';
import Image from 'next/image';
import { siteConfig } from '../../config/site';

import '@csstools/normalize.css';
import '@repo/styles/globals.css';
import '@repo/tokens/css/tokens.css';
import '@repo/ui/css/styles.css';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const interFont = InterFontSans({
	subsets: ['latin'],
	display: 'swap',

	/**
	 * use fontSans.variable instead of fontSans.className in HTML element class to generate css variable defined above
	 */
	variable: '--inter-font-sans',
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
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={interFont.className}>
			<body>
				<ThemeProvider
					// ref: https://www.npmjs.com/package/next-themes
					storageKey="AG-Theme"
					defaultTheme="system"
					// forcedTheme="dark"
					enableSystem
					// enableColorScheme
					// disableTransitionOnChange // enabling this since transition is staggered
					// themes={['light', 'dark']}
					// Note! When you pass themes, the default set of themes ("light" and "dark") are overridden. Make sure you include those if you still want your light and dark themes:
					// ref: https://www.npmjs.com/package/next-themes#more-than-light-and-dark-mode
					// attribute="data-theme"
					attribute="class"
					// Note! Tailwind supports dark theme by  using class or data-attributes, which can be configured in tailwind.config.js. If you use class, you can set attribute to class and it will work out of the box. If you use data-attribute, you need to set attribute to data-theme="dark" (or whatever your data-attribute is).
					// https://www.npmjs.com/package/next-themes#with-tailwind
					value={{
						light: agTheme.light,
						dark: agTheme.dark,
					}}
				>
					<nav className={clsx(container, navBar)}>
						<Image src="/react.png" width={25} height={25} alt="React Logo" />
						<div>NextJS App Router</div>
						<ThemeSwitcher />
					</nav>
					<HtmlMain>{children}</HtmlMain>
				</ThemeProvider>
			</body>
		</html>
	);
}
