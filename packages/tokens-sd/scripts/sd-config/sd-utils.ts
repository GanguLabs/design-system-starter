import { globSync } from 'glob';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { tokensOutDir } from '../shared-constants.ts';

export const CWD = process.cwd();
export const buildDir = path.join(CWD, tokensOutDir);

export const buildFolder = (folderName: string) =>
	path.relative(CWD, buildDir + '/' + folderName);

/** Scans for token files and removes empty json files without any tokens */
export function getNonEmptyTokenFiles() {
	// const tokenFiles = [
	// 	// 'src/tokens/2-semantic/z-index.json',
	// 	'src/tokens/2-semantic/text.json',
	// 	// 'src/tokens/2-semantic/object-values.json',
	// 	// 'src/tokens/2-semantic/content.json',
	// 	'src/tokens/1-base/dimensions.json',
	// 	'src/tokens/1-base/colors.json',
	// 	'src/tokens/3-component/button.json',
	// ];

	// const tokensFolder = 'src/tokens';
	// const tokenFiles = fs
	// 	.readdirSync(tokensFolder)
	// 	.filter((file) => file.endsWith('.json') || file.endsWith('.tokens'));

	const allTokenFiles = globSync('src/tokens/**/*.{json,tokens}', {
		posix: true,
		// dotRelative: true,
	});

	// const tokenFiles = globSync('src/tokens/1-base/*.json', {
	// 	posix: true,
	// 	// dotRelative: true,
	// });
	// const tokenFilesAwait = await glob('src/tokens/**/*.{json,tokens}');

	return allTokenFiles.filter((filePath) => {
		try {
			const stats = statSync(filePath);
			if (stats.size === 0) return false;

			const content = readFileSync(filePath, 'utf-8');
			if (content.trim().length === 0) return false;

			const jsonObject = JSON.parse(content);

			if (typeof jsonObject === 'object' && jsonObject !== null) {
				if (
					Object.keys(jsonObject).length === 0 &&
					Array.isArray(jsonObject) === false
				) {
					return false;
				}
				if (Array.isArray(jsonObject) && jsonObject.length === 0) {
					return false;
				}
			}
			return true;
		} catch (error: any) {
			console.error(`Error processing file ${filePath}: ${error.message}`);
			return false;
		}
	});
}
