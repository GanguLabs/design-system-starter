import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import {
	logBrokenReferenceLevels,
	logVerbosityLevels,
	logWarningLevels,
} from 'style-dictionary/enums';
import type { Config, LocalOptions } from 'style-dictionary/types';

import { customHeader, tsTypeSafe } from './sd-config/sd-formatter.ts';
import { getPlatforms } from './sd-config/sd-platforms.ts';
import { customTransformGroups } from './sd-config/sd-transforms.ts';
import { getNonEmptyTokenFiles } from './sd-config/sd-utils.ts';

register(StyleDictionary);

// 1. Setup Data
const filesToUse = getNonEmptyTokenFiles();
const defaultOptions: LocalOptions = {
	fileHeader: 'myCustomHeader',
	showFileHeader: true,
	formatting: {
		fileHeaderTimestamp: true,
		footer: '\n\n * Footer: Design System using Style Dictionary \n*/\n',
	},
};

// 2. Register Custom Hooks
StyleDictionary.registerFileHeader({
	name: 'myCustomHeader',
	fileHeader: customHeader,
});

// 3. Define the Configuration
const mySdConfig: Config = {
	source: filesToUse,
	preprocessors: ['tokens-studio'],
	log: {
		warnings: logWarningLevels.warn,
		verbosity: logVerbosityLevels.verbose,
		errors: { brokenReferences: logBrokenReferenceLevels.throw },
	},
	hooks: {
		transformGroups: customTransformGroups,
		formats: { 'typescript/const-object': tsTypeSafe },
	},
	platforms: getPlatforms(filesToUse, defaultOptions),
	usesDtcg: true,
};

// 4. Execution
const mySd = new StyleDictionary(mySdConfig);

async function cleanAndBuild(sd: StyleDictionary) {
	await sd.hasInitialized;
	console.log('Cleaning and Building...');
	await sd.cleanAllPlatforms();
	await sd.buildAllPlatforms();
	console.log('Build complete!');
}

await cleanAndBuild(mySd);
