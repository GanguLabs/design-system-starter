import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// ref: https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
export default defineConfig({
	plugins: [react(), dts({ include: ['lib'] })],
	build: {
		copyPublicDir: false,
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
		},
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			formats: ['es'],
		},
	},
});
