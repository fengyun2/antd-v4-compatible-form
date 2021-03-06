import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';
import NpmImport from 'less-plugin-npm-import';
import copy from 'rollup-plugin-copy';
import svgr from '@svgr/rollup';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    postcss({
      extract: `dist/index.css`,
      use: [
        [
          'less',
          {
            javascriptEnabled: true,
            plugins: [new NpmImport({ prefix: '~' })],
          },
        ],
      ],
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    json(),
    commonjs(),
    copy({
      targets: [
        { src: 'src/style/*', dest: 'dist/style' },
      ],
    }),
  ],
};
