import '@ds-starter/tokens/css/tokens.css';
import '@ds-starter/ui/css/styles.css';

import '@repo/styles/globals.css';
import { container } from '@repo/styles/header.css';
import '@repo/styles/theme.css';
import Image from 'next/image';

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
