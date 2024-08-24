import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

dotenv.config();

const __dirname = dirname(fileURLToPath(
    import.meta.url));

export default {
    entry: './src/client/index.js',
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }, ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new NodePolyfillPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: ['default', {
                    discardComments: { removeAll: true },
                }],
            },
        }),
        new TerserPlugin(),
        new WorkboxPlugin.GenerateSW(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env)
                    // add other environment variables here
            }
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
}