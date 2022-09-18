const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackInjectAttributesPlugin = require("html-webpack-inject-attributes-plugin");

const packageName = require('./package.json').name;

module.exports = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "output"),
        filename: "[name].[contenthash].js",
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            "@babel/preset-react"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        }),
        new htmlWebpackInjectAttributesPlugin({
            entry: "true"
        })
    ],
    devServer: {
        compress: true,
        port: 9000,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    mode: "development",
    resolve: {
        extensions: [".jsx", ".js"]
    }
}
