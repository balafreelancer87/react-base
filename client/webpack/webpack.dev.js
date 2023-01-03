/**
 * Webpack configuration.
 */

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
    mode: "development",
   
    /* devtool: 'eval-source-map', */
    devtool: 'cheap-module-source-map', /* for error-overlay-webpack-plugin */
   
    module:{
        /** "rules"
         * This says - "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' 
         * file inside of a require()/import statement, use the babel-loader to transform it before you 
         * add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        rules: [
          
            // Styles: Inject CSS into the head with source maps
            {
                test: /\.(css|scss|sass)$/,
                exclude: /node_modules/, //folder to be excluded
                use: [
                'style-loader',
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

       
    ],
    devServer: {
        /** "port" 
         * port of dev server
        */
        port: "9500",
        /** "static" 
         * This property tells Webpack what static file it should serve
        */
        //static: ["./public"],
        //static: paths.outputPath,
        static: {
            directory: paths.outputPath,
        },
        /** "open" 
         * opens the browser after server is successfully started
        */
        open: true,
        /** "hot"
         * enabling and disabling HMR. takes "true", "false" and "only". 
         * "only" is used if enable Hot Module Replacement without page 
         * refresh as a fallback in case of build failures
         */
        hot: true ,
        /** "liveReload"
         * disable live reload on the browser. "hot" must be set to false for this to work
        */
        liveReload: true,
        // client: {
        //     logging: 'info',
        //     overlay: true,
        // },
    },
});