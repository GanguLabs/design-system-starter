const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['@repo/ui'],
};

module.exports = withVanillaExtract(nextConfig);
