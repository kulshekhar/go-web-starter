import * as path from 'path';
import { Rule } from 'webpack';

const dev = process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'development';

export const tsRule: Rule = {
  test: /\.ts?/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: './static/scripts/[name].[hash].js',
      },
    },
    {
      loader: 'ts-loader',
      options: {
        // Use the production tsconfig by default
        configFile: (dev
          ? path.resolve(__dirname, '../tsconfig.dev.json')
          : path.resolve(__dirname, '../tsconfig.json')),
      },
    },
  ],
};

export const htmlRule: Rule = {
  test: /\.html$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].html',
      },
    },
    { loader: 'extract-loader' },
    {
      loader: 'html-loader',
      options: {
        minimize: !dev,
        attrs: ["link:href", "script:src"],
      },
    },
  ]
};

export const styleRule: Rule = {
  test: /\.scss$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: './static/styles/[name].[hash].css',
      },
    },
    { loader: 'extract-loader' },
    {
      loader: "css-loader",
    },
    { loader: 'sass-loader' },
  ]
};
