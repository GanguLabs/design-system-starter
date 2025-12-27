import { ReactNode } from 'react';
import ThemeColorSchemeImage from './css-color-scheme';
import NextThemedImage from './next-themes';

// 2. Create the Parent Wrapper
const ThemedImage = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

// 3. Compound them by attaching the components to the Parent
ThemedImage.ThemeColorScheme = ThemeColorSchemeImage;
ThemedImage.NextThemed = NextThemedImage;

export default ThemedImage;
