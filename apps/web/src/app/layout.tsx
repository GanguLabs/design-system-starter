import HtmlMain from '@/components/html-main/html-main';
import { SiteFooter } from '@/components/site-footer/site-footer';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';
import { ThemeProvider } from '@/providers/theme-provider';
import { tokensDark, tokensLight } from '@ds-starter/tokens';
import '@ds-starter/tokens/css/tokens.css';
import '@ds-starter/ui/css/styles.css';
import '@repo/styles/globals.css';
import { container } from '@repo/styles/header.css';
import { darkTheme, lightTheme } from '@repo/styles/theme.css';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import Image from 'next/image';

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	// this add the html `<head/>` element
	// ref: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
	metadataBase: new URL('https://anweshgangula.github.io/'),
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
		<html lang="en">
			<body className={fontSans.variable}>
				<ThemeProvider
					// ref: https://www.npmjs.com/package/next-themes
					storageKey="AG-Theme"
					defaultTheme="system"
					// forcedTheme="dark"
					enableSystem={true} // this is needed to enable system theme detection
					enableColorScheme={true} // this make form elements like input, select, etc to adapt to dark mode automatically
					disableTransitionOnChange // enabling this since transition is staggered
					// themes={['light', 'dark']}
					// Note! When you pass themes, the default set of themes ("light" and "dark") are overridden. Make sure you include those if you still want your light and dark themes:
					// ref: https://www.npmjs.com/package/next-themes#more-than-light-and-dark-mode
					// attribute="data-theme" // data-theme doesn't work with vanilla extract, since vanilla-extract is class based.
					attribute="class"
					// Note! Tailwind supports dark theme by  using class or data-attributes, which can be configured in tailwind.config.js. If you use class, you can set attribute to class and it will work out of the box. If you use data-attribute, you need to set attribute to data-theme="dark" (or whatever your data-attribute is).
					// https://www.npmjs.com/package/next-themes#with-tailwind
					value={{
						light: lightTheme,
						dark: darkTheme,
					}}
				>
					<div className={`${container} `}>
						<Image src="/react.png" width={25} height={25} alt="React Logo" />
						<div>NextJS App Router</div>
						<ThemeSwitcher />
					</div>
					<HtmlMain>{children}</HtmlMain>
					<SiteFooter />
				</ThemeProvider>
			</body>
		</html>
	);
}
