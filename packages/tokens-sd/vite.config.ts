import { execSync } from 'child_process';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { packageOutDir } from './shared-constants';
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
			// CRITICAL: Include the generated TS tokens so types are created for them
			include: ['src/**/*.ts', 'public/tokens/ts/**/*.ts'],
			// Ensure it points to your app's tsconfig
			tsconfigPath: './tsconfig.json',
			// Optional: merges all declarations into one index.d.ts
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
