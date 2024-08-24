import webpack from 'webpack';
import path from 'path';
import url from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

// Define __dirname for ES module
const __filename = url.fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        path: path.resolve('dist'),
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(scss|css)$/, // Update this line
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
        new webpack.DefinePlugin({ // Add this block
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.geonamesUsername': JSON.stringify(process.env.geonamesUsername),
            'process.env.WeatherBitApiKey': JSON.stringify(process.env.WeatherBitApiKey),
            'process.env.pixabayApiKey': JSON.stringify(process.env.pixabayApiKey),
        })
    ],
};