/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  base: '/bo/',
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/bo',
  server: {
    port: 4201,
    host: 'localhost',
  },
  preview: {
    port: 4301,
    host: 'localhost',
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          $assetsPath: '@account-upgrade-ui/assets';
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@account-upgrade-ui/assets': path.resolve(
        __dirname,
        '../../libs/assets/src/lib',
      ),
    },
  },
  plugins: [
    react(),
    federation({
      name: 'boApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/app/app.tsx',
        './styles': './src/styles.scss',
      },
      shared: {
        react: {
          import: true,
          shareScope: 'default',
          requiredVersion: false,
        },
        'react-dom': {
          import: true,
          shareScope: 'default',
          requiredVersion: false,
        },
        '@account-upgrade-ui/assets': {
          import: true,
          shareScope: 'default',
          requiredVersion: false,
          packagePath: '../../libs/assets/package.json',
          generate: true,
        },
      },
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin([
      '*.md',
      '**/*.{svg,png,jpg,jpeg,gif,webp,avif}',
      '**/*.{css,scss}',
    ]),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/bo',
    target: 'esnext',
    modulePreload: false,
    emptyOutDir: true,
    cssCodeSplit: false,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
