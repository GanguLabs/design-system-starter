import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const path = require('node:path');

const withVanillaExtract = createVanillaExtractPlugin();

export type SassOptionsType = NextConfig['sassOptions'];

const sassOptions: SassOptionsType = {
	includePaths: [path.join(__dirname, 'src/styles')],
	outputStyle: 'compressed',
	implementation: 'sass', // 'sass-embedded',
	additionalData:
		'$nextConfigPrimaryColor: #3b82f6; $nextConfigSecondaryColor: #10b981;',
};

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	reactStrictMode: true,
	sassOptions: sassOptions,
	transpilePackages: ['@repo/ui'],
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
