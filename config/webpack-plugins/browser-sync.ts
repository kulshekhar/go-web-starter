import * as bs from 'browser-sync';
import * as bsPlugin from 'browser-sync-webpack-plugin';

const options: bs.Options = {
  proxy: 'localhost:4000',
  files: [
    '**/*.gobin',
  ],
  reloadDebounce: 300,
  reloadDelay: 1000,
  notify: false,
};

options['watchEvents'] = ['change', 'add', 'addDir'];

export const BrowserSyncPlugin = new bsPlugin(options);
