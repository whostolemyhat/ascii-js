'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var webpackConfig = require('./webpack.config');

    grunt.initConfig({
        app: __dirname + '/app',

        webpack: {
            options: webpackConfig,

            app: {
                entry: '<%= app %>/src/boot.jsx',
                output: {
                    path: '<%= app %>/js',
                    filename: 'app.js'
                }
            },

            worker: {
                entry: '<%= app %>/src/services/asciiWorker.js',
                output: {
                    path: '<%= app %>/js',
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
                    '<%= app %>/css/main.css': '<%= app %>/sass/main.scss'
                }
            }
        },

        eslint: {
            target: [
                '<%= app %>/src/**/*'
            ]
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },

            css: {
                files: [
                    '<%= app %>/sass/**/*'
                ],
                tasks: ['sass']
            },

            js: {
                files: [
                    '<%= app %>/src/**/*.*'
                ],
                tasks: ['eslint', 'webpack']
            }
        },

        connect: {
            options: {
                port: 3000,
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

    grunt.registerTask('default', ['sass', 'eslint', 'webpack', 'connect', 'watch']);
};
