/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/brm',
  server: {
    port: 4202,
    host: 'localhost',
  },
  preview: {
    port: 4302,
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
      name: 'brmApp',
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
    outDir: '../../dist/apps/brm',
    target: 'esnext',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
