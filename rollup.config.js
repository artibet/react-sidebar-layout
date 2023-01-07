import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default {
  input: "src/index.js",
  output: [
    {
      file: './dist/cjs/index.js',
      format: "cjs",
      sourcemap: false
    },
    {
      file: './dist/esm/index.js',
      format: "esm",
      sourcemap: false
    }
  ],
  plugins: [
    // replace({
    //   "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    // }),
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx'],

    }),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
      exclude: ["node_modules/**", "dist/**"]
    }),
    commonjs(),
    terser()
  ]
}