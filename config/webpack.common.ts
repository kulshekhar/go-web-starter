import * as path from 'path';
import { Configuration } from 'webpack';
import { sync } from 'glob';
import { tsRule, htmlRule, styleRule } from './webpack.rules';

const htmlEntries = sync(path.resolve(__dirname, '../templates/*.html'));
const tsEntries = sync(path.resolve(__dirname, '../static/scripts/*.ts'));
const scssEntries = sync(path.resolve(__dirname, '../static/styles/*.scss'));

const config: Configuration = {
  entry: [...htmlEntries, ...tsEntries, ...scssEntries],

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      tsRule,
      htmlRule,
      styleRule,
    ]
  },

};

export default config;
