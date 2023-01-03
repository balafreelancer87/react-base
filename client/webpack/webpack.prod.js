/**
 * Webpack configuration.
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');

const paths = require('./paths');
const common = require('./webpack.common');

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports= merge(common, {
    /** "mode"
     * the environment - development, production, none. tells webpack 
     * to use its built-in optimizations accordingly. default is production 
     */
    mode: "production",
 
    devtool: 'source-map',   
   
    output: {
      /** "filename"
         * the name of the output file 
         */
      filename: 'js/[name].[hash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
      /** "path"
       * the folder path of the output file 
       */
      path: paths.outputPath,
      publicPath: '/',     
    },   
   
    module:{
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' 
         * file inside of a require()/import statement, use the babel-loader to transform it before you 
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        rules: [
           
            // {
            //     test: /\.(scss|sass|css)$/,
            //     exclude: /node_modules/, //folder to be excluded
            //     use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            // },
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/, //folder to be excluded
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1, modules: false },
                    },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
        ]
    },

    plugins: [
        // Extracts CSS into separate files
        // Note: style-loader is for development, MiniCssExtractPlugin is for production
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: 'styles/[id].[contenthash].css',
        }),

    ],

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
              minimizerOptions: {
                preset: [
                  'default',
                  {
                    discardComments: {
                      removeAll: true,
                    },
                  },
                ],
              },
            }),
          ],
        // runtimeChunk: {
        //   name: 'runtime',
        // },
        moduleIds: 'deterministic', //Added this to retain hash of vendor chunks. 
        //runtimeChunk: 'single',
        runtimeChunk: {
            name: 'single',
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                // reactVendor: {
                //   test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                //   name: 'vendor-react',
                //   chunks: 'all',
                // },
            },
        },
    },
    
    performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    },
    
});