import type {
	BackgroundColorScale,
	ColorScale,
} from './leo/models/leonardo-color-scales';

// Components
export { Button } from './components/button';
export { Input } from './components/input';
export { Label } from './components/label';
// Color Wrapper
export * from './leo';
export type { BackgroundColorScale, ColorScale };

// Expose Adobe Leonardo
// export type { Color, Theme } from '@adobe/leonardo-contrast-colors';
