import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	reactStrictMode: true,
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime }
	) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,

				// ref: https://stackoverflow.com/q/67478532/6908282
				// Fixes npm packages that depend on `fs` module
				fs: false,
			};
		}

		return config;
	},
};

export default withVanillaExtract(nextConfig);
