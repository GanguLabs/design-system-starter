import { W3CColorToken } from '../models/tokens';
import { blue, neutral } from './base';

/**
 * Strictly typed semantic map.
 * If you try blue.step('999'), TypeScript will throw an error.
 */
export const semanticDefinitions = {
	'surface-canvas': {
		$value: neutral.step('0'),
		$description: 'Main background color',
	},
	'surface-subtle': {
		$value: neutral.step('10'),
		$description: 'Subtle backgrounds like inputs',
	},
	'brand-primary': {
		$value: blue.step('500'),
		$description: 'Primary brand action color',
	},
} satisfies Record<string, W3CColorToken>;
