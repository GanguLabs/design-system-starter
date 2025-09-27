import '@ds-starter/tokens/css/tokens.css';
import '@ds-starter/ui/css/styles.css';

import '@repo/styles/globals.css';
import { container } from '@repo/styles/header.css';
import '@repo/styles/theme.css';
import { Metadata } from 'next';
import Image from 'next/image';

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-theme="dark">
			<body>
				<div className={container}>
					<Image src="/react.png" width={25} height={25} alt="React Logo" />
					<div>NextJS App Router</div>
				</div>
				<div>{children}</div>
			</body>
		</html>
	);
}
