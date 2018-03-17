import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
  input: "app/today.js",
  output: {
    file: "www/today.js",
    format: "es",
    sourcemap: "inline"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({exclude: "node_modules/**"}),
    eslint()
  ]
};
