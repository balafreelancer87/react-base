/**
 * Webpack configuration.
 */
const path = require("path");
// import paths from './paths';
const paths = require('./paths');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CompressionPlugin = require('compression-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports={
    // Where webpack looks to start building the bundle
    entry: paths.entryPath,
    // Where webpack outputs the assets and bundles
    output: {
        path: paths.outputPath,
        /*
        Generate New File Name Every Execution (only on content change) 
        //simple add [contenthash] to the filename you want to have new name
        */
        filename: "bundle.[contenthash].js",
        publicPath: "/",
        /*  The clean-up can be achieved by setting the clean option in the output object to true */
        clean: true,
        /*  to keep files original names like images whily build*/
        assetModuleFilename: "[name][ext]",
    },

    /** "target"
     * setting "node" as target app (server side), and setting it as "web" is
     * for browser (client side). Default is "web"
     */
    // Production: Magic happen here transpiling to es5 to partly support older browser like IE11
    target: ['web', 'es5'],
    resolve: {
        /** "extensions"
         * If multiple files share the same name but have different extensions, webpack will
         * resolve the one with the extension listed first in the array and skip the rest.
         * This is what enables users to leave off the extension when importing
         */
        modules: [paths.src, "node_modules"],
        extensions: ["*", ".js", ".jsx", ".css", ".scss", ".json", ".html"],
        alias: {
            '@': paths.src,
            assets: paths.assetsPath,
        },
    },

    module:{
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx'
         * file inside of a require()/import statement, use the babel-loader to transform it before you
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from
         * being searched"
         */
        rules: [
            {
                test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                exclude: /node_modules/, //folder to be excluded
                use:  'babel-loader' //loader which we are going to use
            },
            // Images and SVGs
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                include: paths.src,
                // use: [
                //     {
                //       loader: 'img-optimize-loader',
                //     },
                // ],
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // Inline images under 10KB -- default-8KB
                    }
                },
                generator: {
                    filename: "assets/images/[name][ext]",
                },
            },
            // Fonts
            {
                test: /\.(woff(2)?|eot|ttf|otf|)$/,
                type: 'asset/inline',
            },
        ]
    },
    // Customize the webpack build process
    plugins: [
        // Removes/cleans build folders and unused assets when rebuilding
        new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
        patterns: [
            {
                from: `${paths.static}/robots.txt`,
                to: paths.outputPath,
            },
            {
                from: `${paths.static}/manifest.json`,
                to: paths.outputPath,
            },
            {
                from: `${paths.static}/favicon.ico`,
                to: paths.outputPath,
            },
            // {
            //     from: `${paths.assetsPath}/images`,
            //     to: `${paths.outputPath}/assets/images`
            // },
        ],
        }),

        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
            // meta: {
            //     viewport: 'width=device-width, initial-scale=1,viewport-fit=cover, shrink-to-fit=no',
            //     'theme-color': '#FF7714',
            //     'apple-mobile-web-app-status-bar-style': '#FF7714',
            //     'og:title': 'Food Delivery',
            //     'og:description': 'A simple Boilerplate of React Js',
            //     'content-type': {'http-equiv': 'content-type', content: 'text/html; charset=UTF-8'}
            // },
            title: "My Base",
            //favicon: paths.src + "/assets/icons/favicon.png",
            template: paths.templatePath,
            filename: "index.html", // output file
            minify: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                preserveLineBreaks: true,
                minifyURLs: true,
                removeComments: true,
                removeAttributeQuotes: true,

                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),

        new CompressionPlugin(),
        new ErrorOverlayPlugin(),
        new BundleAnalyzerPlugin({
            analyzerPort: 8001,
            reportTitle: "Bundle Analyzer"
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        })
    ]
}