module.exports = function(config) {
    var webpackConfig = require('./webpack.config');

    config.set({
        frameworks: ['jasmine'],

        files: [
            './test/run.js'
        ],

        preprocessors: {
            './test/run.js': ['webpack']
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: [/node_modules/],
                        loader: 'babel',
                        query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },

            resolve: {
                modulesDirectories: [
                    'app',
                    'app/src',
                    'app/src/features',
                    'app/src/services',
                    'node_modules'
                ],
                extensions: ['', '.js', '.jsx', '.json']
            },

            stats: {
                colors: true
            }
        },

        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-chrome-launcher')
        ],

        reporters: ['dots'],
        port: 9876,
        colors: true,
        browsers: ['Chrome']
    });
}