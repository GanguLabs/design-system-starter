import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// ref: https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
export default defineConfig({
	plugins: [
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
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			formats: ['es'],
			fileName: () => `main.js`, // Forces the output to be main.js
		},
	},
});
