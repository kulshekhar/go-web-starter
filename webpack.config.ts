import prodConfig from './config/webpack.prod';
import devConfig from './config/webpack.dev';

if (['development', 'dev'].indexOf(process.env.NODE_ENV) >= 0) {
  module.exports = devConfig;
} else {
  module.exports = prodConfig;
}
