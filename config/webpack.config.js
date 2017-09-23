const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../dist")
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css", ".jpeg", ".jpg", ".gif", ".png"],
        alias: {
            images: path.resolve(__dirname, 'src/assets/images')  // src/assets/images alias
        },
        // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
        modules: ['src', 'node_modules']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: ["awesome-typescript-loader"] },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: ["source-map-loader", "babel-loader"] },

            {
                test: /\.scss$/, // files ending with .scss
                use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({  // HMR for styles
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'postcss-loader'],
                })),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
                  loader: 'image-webpack-loader',
                  query: {
                    mozjpeg: {
                      progressive: true,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    optipng: {
                      optimizationLevel: 4,
                    },
                    pngquant: {
                      quality: '75-90',
                      speed: 3,
                    },
                  },
                }],
                exclude: /node_modules/,
                include: __dirname,
              },
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin('styles.css'),
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "../dist"), // A directory or URL to serve HTML content from.
        historyApiFallback: true, // fallback to /index.html for Single Page Applications.
        inline: true,
        open: true,
        compress: true,
        hot: true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}

module.exports = config;

if (process.env.NODE_ENV === 'production') { // if we're in production mode, here's what happens next
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
        new OptimizeCSSAssets() // call the css optimizer (minfication)
    );
}
