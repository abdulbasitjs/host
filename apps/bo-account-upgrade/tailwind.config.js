const { withKamona } = require('@kamona/tailwind-plugin');
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

const KAMONA_ROOT = join(__dirname, '../../', 'node_modules/@kamona');
const FILE_EXTENSIONS = '{js,ts,jsx,tsx,mdx,html,css,scss,mjs}';
const EXCLUDE_PATTERN = '!(*.spec)';

module.exports = withKamona({
  content: [
    join(KAMONA_ROOT, `**/*${EXCLUDE_PATTERN}.${FILE_EXTENSIONS}`),
    join(__dirname, './src/**/*.{js,ts,jsx,tsx,mjs,mdx,html}'),
    join(__dirname, './index.html'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
