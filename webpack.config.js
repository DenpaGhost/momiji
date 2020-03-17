const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        publicPath: '/'
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
    resolve: {
        extensions: ['.js', '.vue', '.ts', '.css'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [new VueLoaderPlugin()]
};