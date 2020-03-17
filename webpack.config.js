const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js'
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
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.{css|sass|scss}$/,
                loader: 'sass-loader',
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
};