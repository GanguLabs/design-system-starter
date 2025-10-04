import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@repo/ui'],
};

export default withVanillaExtract(nextConfig);
