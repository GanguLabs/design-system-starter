import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import { build } from 'velite';

const withVanillaExtract = createVanillaExtractPlugin();

class VeliteWebpackPlugin {
	static started = false;
	constructor(/** @type {import('velite').Options} */ options = {}) {
		this.options = options;
	}
	apply(/** @type {import('webpack').Compiler} */ compiler) {
		// executed three times in nextjs !!!
		// twice for the server (nodejs / edge runtime) and once for the client
		compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
			if (VeliteWebpackPlugin.started) return;
			VeliteWebpackPlugin.started = true;
			const dev = compiler.options.mode === 'development';
			this.options.watch = this.options.watch ?? dev;
			this.options.clean = this.options.clean ?? !dev;
			await build(this.options); // start velite
		});
	}
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/blog/:path*',
				destination: '/velite-blog/:path*',
			},
		];
	},
	// async redirects() {
	// 	return [
	// 		// Basic redirect
	// 		{
	// 			source: '/about',
	// 			destination: '/',
	// 			permanent: false,
	// 		},
	// 		{
	// 			source: '/blog/:path*',
	// 			destination: '/velite-blog/:path*',
	// 			permanent: false,
	// 		},
	// 		// // Wildcard path matching
	// 		// {
	// 		// 	source: '/blog/:slug',
	// 		// 	destination: '/news/:slug',
	// 		// 	permanent: false,
	// 		// },
	// 	];
	// },
	reactStrictMode: true,
	transpilePackages: ['@repo/ui'],
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.resolve.fallback = {
				// ref: https://stackoverflow.com/q/67478532/6908282
				...config.resolve.fallback,
				fs: false,
			};
		}

		config.plugins.push(new VeliteWebpackPlugin());

		return config;
	},
};

export default withVanillaExtract(nextConfig);
