// vite.config.ts
import { execSync } from 'child_process';
import path from 'path';
import { defineConfig } from 'vite';

const outDir = 'build';
export default defineConfig({
	root: 'src',
	build: {
		outDir,
		emptyOutDir: true,
		sourcemap: true,
		minify: 'esbuild', // Use esbuild for minification (default)
		assetsDir: 'assets',
		rollupOptions: {
			input: path.resolve(__dirname, 'src/index.html'),
			output: {
				assetFileNames: 'assets/[name]-[hash][extname]', // Hashing for cache busting
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // Optional alias for cleaner imports
		},
	},
	define: {
		'process.env.NODE_ENV': '"production"', // Inject environment variables
		// Statically replace __OUT_DIR__ with the JSON-stringified value
		__OUT_DIR__: JSON.stringify(outDir),
	},
	plugins: [
		{
			name: 'style-dictionary-watcher',
			handleHotUpdate({ file }) {
				// Trigger a rebuild if a token file changes
				if (file.endsWith('.json')) {
					console.log('Token changed, rebuilding...');
					execSync('npx style-dictionary build');
				}
			},
		},
	],
});
