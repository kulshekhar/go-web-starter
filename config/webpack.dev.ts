import { Configuration } from 'webpack';
import CommonConfig from './webpack.common';
import { BrowserSyncPlugin } from './webpack-plugins/browser-sync';
import { CleanUp } from './webpack-plugins/cleanup';

const config: Configuration = {
  ...CommonConfig,
};

config.plugins = (config.plugins || []).concat([
  BrowserSyncPlugin,
  CleanUp,
]);

export default config;
