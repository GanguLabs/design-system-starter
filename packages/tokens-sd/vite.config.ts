import { execSync } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { packageOutDir } from './scripts/shared-constants';
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	// Explicitly set the public directory (defaults to 'public')
	publicDir: 'public',
	// 1. Keep root at project level for library builds
	build: {
		outDir: packageOutDir,
		emptyOutDir: true,
		lib: {
			// Use absolute path for the entry point
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'MyDesignTokens',
			fileName: 'index', // (format) => `index.${format}.js`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: { external: ['style-dictionary', 'path', 'child_process'] },
	},
	plugins: [
		{
			name: 'post-build-copy',
			closeBundle: async () => {
				const srcDir = path.resolve(__dirname, 'src/sd-build');
				const destDir = path.resolve(__dirname, 'dist/sd-build');

				if (fs.existsSync(srcDir)) {
					// Recursive copy (Requires Node 16.7.0+)
					fs.cpSync(srcDir, destDir, { recursive: true });
					console.log('Successfully copied sd-build contents to dist');
				}
			},
		},
		{
			name: 'style-dictionary-watcher',
			// During 'vite' (dev mode), this watches for token changes
			handleHotUpdate({ file }) {
				if (file.endsWith('.json') || file.endsWith('.tokens')) {
					console.log('Token changed, rebuilding Style Dictionary...');
					try {
						// Use the TSX approach we set up previously for reliability
						execSync('pnpm build:tokens', { stdio: 'inherit' });
					} catch (err) {
						console.error('Style Dictionary build failed:', err);
					}
				}
			},
		},
		dts({
			insertTypesEntry: true,
			// 3. Ensure the plugin includes both your src and the generated tokens
			// CRITICAL: Include the generated TS tokens so types are created for them
			include: ['src/**/*.ts', 'src/sd-build/tokens/**/*.ts'],
			exclude: [
				'scripts/sd.config.ts',
				'scripts/sd-config/**',
				'src/**/*.test.ts',
				'node_modules/**',
				'shared-constants.ts', // Add any other config files here
			],
			// 1. Explicitly point to the correct tsconfig
			// Vite templates often use 'tsconfig.app.json'. Ensure this matches yours.
			tsconfigPath: './tsconfig.json',

			// 4. Sometimes helpful if API Extractor gets confused about the root
			entryRoot: 'src',
			// rollupTypes: true,
		}),
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
