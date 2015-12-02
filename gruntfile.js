'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        webpack: {
            dist: {
                entry: 'src/js/main.js',
                output: {
                    path: 'public/js',
                    filename: 'main.js'
                },

                cache: true,

                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: 'babel-loader'
                        },
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            loader: 'babel-loader'
                        }
                    ]
                },

                stats: {
                    colors: true,
                    modules: true,
                    reasons: true
                }
            },

            test: {
                entry: 'test'
            }
        }
    });

    grunt.registerTask('default', ['webpack']);
};
