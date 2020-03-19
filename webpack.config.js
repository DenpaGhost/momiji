const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './static'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.css'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, './')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: "/node_modules/",
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    extractCSS: false
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
};