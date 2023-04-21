import vue from 'rollup-plugin-vue';

import {nodeResolve} from '@rollup/plugin-node-resolve';
import {name} from '../package.json';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';
import {readdirSync, statSync, existsSync} from 'fs';
import path from 'path';

const file = type => `dist/${name}.${type}.js`;

const inputFiles = {
  main: 'packages/index.js',
};

const comsPath = path.resolve(__dirname, '../packages/components');
const dirs = readdirSync(comsPath);

dirs.forEach(d => {
  const comPath = path.resolve(comsPath, d);
  if (statSync(comPath).isDirectory) {
    const indexFilePath = path.resolve(comsPath, d, 'index.js');
    if (existsSync(indexFilePath)) {
      inputFiles[d.toLowerCase()] = indexFilePath;
    }
  }
});

export {name, file};
export default {
  input: inputFiles,
  // output: {
  //   name,
  //   file: file('esm'),
  //   format: 'es',
  // },
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
    // 压缩代码
    terser(),
    // 剔除debugger、assert.equal和 console.log 类似的函数
    strip({
      labels: ['unittest'],
    }),
  ],
  external: [/element-ui/],
};
