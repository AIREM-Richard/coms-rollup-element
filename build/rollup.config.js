import vue from 'rollup-plugin-vue';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import { name } from '../package.json';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const file = type => `dist/${name}.${type}.js`;

export { name, file };
export default {
  input: 'packages/index.js',
  output: {
    name,
    file: file('esm'),
    format: 'es',
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: 'node_modules/**', // 只转译我们的源代码
    }),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    postcss({
      extensions: ['.css'],
      extract: true,
      plugins: [postcssImport()],
    }),
    commonjs({
      include: ['node_modules/**', 'node_modules/**/*'],
    }),
  ],
  external: ['vue'],
};
