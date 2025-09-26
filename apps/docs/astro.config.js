import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), mdx()],
	vite: {
		plugins: [vanillaExtractPlugin()],
	},
	scopedStyleStrategy: 'class',
});
