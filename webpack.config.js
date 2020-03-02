const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const Development = argv.mode === 'development';

    return {
        entry: {
            index: path.resolve(__dirname, 'src', 'index.tsx')
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js'
        },
        devtool: Development ? 'source-map' : 'none',
        resolve: {
            extensions: ['*', '.js', '.ts', '.tsx'],
            modules: [
                path.resolve(__dirname, 'node_modules')
            ],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        devServer: {
            open: true,
            contentBase: path.resolve(__dirname, 'dist'),
            watchContentBase: true,
            historyApiFallback: true,
        },
        module: {
            rules: rules
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                minify: {
                    collapseWhitespace: Development ? false : true
                }
            }),
            new Dotenv()
        ],
    }
}

const rules = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
    },{
        test: /\.(html)$/,
        loader: 'html-loader'
    }
]