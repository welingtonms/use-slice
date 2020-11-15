import analyze from 'rollup-plugin-analyzer';
import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

// import babel from 'rollup-plugin-babel';
// import external from 'rollup-plugin-peer-deps-external';
// import { terser } from 'rollup-plugin-terser';

module.exports = [
  {
    input: 'src/index.js',
    output: [
      {
        name: 'use-slice',
        file: pkg.browser,
        format: 'umd',
      },
      { name: 'use-slice', file: pkg.main, format: 'cjs' },
      { name: 'use-slice', file: pkg.module, format: 'es' },
    ],
    plugins: [
      del({ targets: [`dist/`] }),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      analyze({
        hideDeps: true,
        summaryOnly: true,
        filter: module => /^\/src/.test(module.id),
      }),
    ],
    external: ['react'],
  },
];
