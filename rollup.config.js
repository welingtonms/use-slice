import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';

module.exports = [
  {
    input: 'src/index.js',
    	output: [
		{
			dir: 'dist',
			format: 'esm',
			sourcemap: true,
		},
	],
    plugins: [
      del({ targets: [`dist/`] }),
      external(),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
      }),
      resolve({
        preferBuiltins: true,
        // Source: https://rollupjs.org/guide/en/#peer-dependencies
        moduleDirectory: ['node_modules'],
      }), // so Rollup can find `ms`
      terser(),
      analyze({
        hideDeps: true,
        summaryOnly: true,
        filter: (module) => /^\/src/.test(module.id),
      }),
    ]
  },
];
