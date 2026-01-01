import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { outDir } from './shared-constants';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	// 1. Keep root at project level for library builds
	build: {
		outDir,
		emptyOutDir: false, // Don't delete Style Dictionary's work
		lib: {
			// Use absolute path for the entry point
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'MyDesignTokens',
			fileName: (format) => `index.${format}.js`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: { external: ['style-dictionary', 'path', 'child_process'] },
	},
	plugins: [
		dts({ insertTypesEntry: true }), // Generates the index.d.ts file
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			// 2. Use normalizePath and absolute paths to prevent EINVAL
		// 			src: normalizePath(path.resolve(__dirname, 'build/css/**/*')),
		// 			dest: 'css',
		// 		},
		// 		{
		// 			src: normalizePath(path.resolve(__dirname, 'build/scss/**/*')),
		// 			dest: 'scss',
		// 		},
		// 	],
		// }),
	],
});
