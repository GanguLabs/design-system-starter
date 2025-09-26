import { COLOR, OUTPUT_COLOR, OUTPUT_FORMAT, type Config } from 'unicornix';

import { CSS_NAMESPACE } from './constants';

export default {
	theme: {
		accent: COLOR.blue,
		neutral: COLOR.gray_cold,
		safe: COLOR.green,
		info: COLOR.sky,
		warning: COLOR.amber,
		alert: COLOR.red,
		content: COLOR.gray_colder,
		background: COLOR.gray_cold,
	},
	output: {
		color: OUTPUT_COLOR.rgb,
		format: [OUTPUT_FORMAT.css, OUTPUT_FORMAT.cssref, OUTPUT_FORMAT.js],
	},
	options: {
		cssNamespace: CSS_NAMESPACE,
		cssColorPrefix: 'color',
	},
} satisfies Config;
