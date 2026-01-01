/**
 * When rollupTypes is enabled in vite.config.ts, the plugin uses a tool called API Extractor
 * API Extractor is designed to bundle source code. By moving the tokens.ts into src, you are telling the tool: "This is part of my source code, please include its types."
 */
export const tokensOutDir = 'src/sd-build/tokens'; // this needs to be inside src folder this path is also hard-coded in other places like vite.config.ts, gitignore, package.json
export const packageOutDir = 'dist'; // 'dist'
