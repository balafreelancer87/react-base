/**
 * Webpack configuration.
 */
require('@babel/register');
const { merge } = require('webpack-merge')  

const common = require('./webpack/webpack.common');

const envs = {
    development: 'dev',
    production: 'prod'
};
/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./webpack/webpack.${env}`);
console.log(`----${env}----`);
//module.exports = envConfig;
module.exports = merge(common, envConfig);
