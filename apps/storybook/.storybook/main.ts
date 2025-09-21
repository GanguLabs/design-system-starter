import { dirname, join } from 'node:path';
import { mergeConfig } from 'vite';
// import tsConfigPaths from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/react-vite';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// import { excludedProps } from './config/excludedProps';

const packages = ['dss-tokens', 'dss-fonts', 'dss-icons', 'dss-ui'];

const introPath = '../stories/**/*.mdx';

const storiesPaths = packages.map(
  (dir) => `../../../packages/${dir}/src/**/*.stories.@(js|jsx|ts|tsx)`
);

const docsPaths = packages.map(
  (dir) => `../../../packages/${dir}/!(node_modules)/**/*.mdx`
);

const docgenPaths = packages.map((dir) => `../../packages/${dir}/src/**/*.tsx`);

const config: StorybookConfig = {
  stories: [introPath, ...storiesPaths, ...docsPaths],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  docs: {
    defaultName: 'Overview',
  },

  core: {
    builder: getAbsolutePath('@storybook/builder-vite'),
  },

  viteFinal: async (config, { configType }) => {
    // ref: https://github.com/storybookjs/storybook/discussions/28817
    // // fixes process is not defined error, that some stories had: https://stackoverflow.com/questions/76106082/upgrading-from-storybook-6-to-storybook-7-results-in-a-process-is-not-defined
    // config.define = { 'process.env': {} };

    // if (config.plugins == undefined) {
    //   config.plugins = [];
    // }

    // // // vue plugin for storybook, this is mandatory!
    // // config.plugins.push(vue());

    // // // the vite builder for storybook needs to know how to resolve our import statements, so we use the vite-tsconfig-paths plugin for that
    // // config.plugins.push(tsConfigPaths());

    // // see https://storybook.js.org/docs/builders/vite#environment-based-configuration for reference
    // config.base = configType == 'DEVELOPMENT' ? '/' : '/storybook/';

    return mergeConfig(
      {
        plugins: [
          vanillaExtractPlugin({
            identifiers: ({ hash }) => `dss_${hash}`,
          }),
          //   tsConfigPaths(),
        ],
      },
      config
    );
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen',
    //     // reactDocgen: 'react-docgen-typescript',
    //     // this is required for correct argTypes processing
    //     reactDocgenTypescriptOptions: {
    //       //   // Speeds up Storybook build time
    //       //   compilerOptions: {
    //       //     allowSyntheticDefaultImports: false,
    //       //     esModuleInterop: false,
    //       //   },
    //       include: docgenPaths,
    //       shouldExtractValuesFromUnion: true,
    //       shouldExtractLiteralValuesFromEnum: true,
    //       shouldRemoveUndefinedFromOptional: true,
    //       propFilter: (prop) => {
    //         if (prop.parent) {
    //           return (
    //             // when NOT using pnpm or/and react-aria make sure to adjust the regEx
    //             !/node_modules\/.pnpm\/(?!react-aria)/.test(prop.parent.fileName) &&
    //             !excludedProps.includes(prop.name)
    //           );
    //         }

    //         return false;
    //       },
    //     },
  },
};

// biome-ignore lint: *
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default config;
