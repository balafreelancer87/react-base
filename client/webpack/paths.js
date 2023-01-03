/**
 * Webpack configuration.
 */
const path = require('path');

module.exports = {
    // root folder path
    root: path.resolve(__dirname, '../'),

    // Source files
    src: path.resolve(__dirname, '../src'),

    // Production build files
    outputPath: path.resolve(__dirname, '../dist'),

    // Public folder
    public: path.resolve(__dirname, '../public'),

    // Static files that get copied to build folder
    static: path.resolve(__dirname, '../static'),

    // entry path for index.js
    entryPath: path.resolve(__dirname, '../src/index.js'),

    // path for index.html
    templatePath: path.resolve(__dirname, '../public/index.html'),
    // path for assets
    assetsPath: path.resolve(__dirname, '../src/assets'),
    // imagesFolder: 'images',
    // fontsFolder: 'fonts',
    // cssFolder: 'css',
    // jsFolder: 'js'
}