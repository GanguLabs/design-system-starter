import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// ref: https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			include: ['lib'],
			tsconfigPath: './tsconfig.build.json',
			outDir: 'dist', // Explicitly tell the plugin to put types here
			insertTypesEntry: true, // Creates a "types" field in your package.json (if missing)
			rollupTypes: true, // This bundles all types into a single main.d.ts
			copyDtsFiles: true,
			afterBuild: () => {
				console.log('Types generation complete!');
			},
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'lib'),
		},
	},
	build: {
		copyPublicDir: false,
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === 'style.css') {
						return 'main.css';
					}
					// Fallback to a default name or use assetInfo.name if it exists
					return assetInfo.name || 'defaultName.css';
				},
			},
		},
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			formats: ['es'],
			fileName: () => `main.js`, // Forces the output to be main.js
		},
	},
});
