'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var webpackConfig = require('./webpack.config');

    grunt.initConfig({
        app: __dirname + '/public',

        webpack: {
            options: webpackConfig,

            app: {
                entry: __dirname + '/src/boot.jsx',
                output: {
                    path: __dirname + '/public/js',
                    filename: 'app.js'
                }
            },

            worker: {
                entry: __dirname + '/src/services/asciiWorker.js',
                output: {
                    path: __dirname + '/public/js',
                    filename: 'asciiWorker.js'
                }
            }
        },

        sass: {
            prod: {
                options: {
                    style: 'compressed',
                    lineNumbers: false
                },
                files: {
                    '<%= app %>/css/main.css': 'sass/main.scss'
                }
            }
        },

        eslint: {
            target: [
                'src/**/*'
            ]
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },

            css: {
                files: [
                    'sass/**/*'
                ],
                tasks: ['sass']
            },

            js: {
                files: [
                    'src/**/*.*'
                ],
                tasks: ['eslint', 'webpack']
            }
        },

        connect: {
            options: {
                port: 3001,
                livereload: 35729,
                hostname: 'localhost',
            },
            livereload: {
                options: {
                    base: ['<%= app %>']
                }
            }
        },
    });

    grunt.registerTask('default', ['sass', 'eslint', 'webpack', 'watch']);
};
