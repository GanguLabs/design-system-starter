module.exports = {
  dependencyTypes: ['local', 'dev', 'prod'],
  semverRange: '^',
  source: ['package.json', 'apps/*/package.json', 'packages/*/package.json'],
  versionGroups: [
    {
      label: 'Pin local config packages to any version (*)',
      packages: ['**'],
      dependencies: ['@repo/tsconfig'],
      dependencyTypes: ['dev'],
      pinVersion: 'workspace:*',
    },
    {
      label: 'Pin unpublished local packages to any version (*)',
      packages: ['**'],
      dependencies: ['@repo/fonts', '@repo/icons', '@repo/tokens', '@repo/ui'],
      dependencyTypes: ['dev', 'prod'],
      pinVersion: 'workspace:*',
    },
  ],
};
