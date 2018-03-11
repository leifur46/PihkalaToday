import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

export default {
  input: "app/today.js",
  output: {
    file: "www/today.js",
    format: "es"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({exclude: "node_modules/**"}),
    eslint(),
    uglify()
  ]
};
