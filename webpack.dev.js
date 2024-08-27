const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack')

module.exports = merge(config, {
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: [{
            context: ['/api'],
            target: 'http://localhost:3000',
        }],
        hot: true,
        static: './dist',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
})