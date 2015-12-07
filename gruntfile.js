'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var webpackConfig = require('./webpack.config');
    var app = __dirname + '/public';

    grunt.initConfig({
        webpack: {
            options: webpackConfig,

            app: {
                entry: __dirname + '/src/boot.jsx',
                output: {
                    path: __dirname + '/public/js',
                    filename: 'app.js'
                }
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    '<%= app %>/css/main.css': '<%= app %>/sass/main.scss',
                    '<%= app %>/css/fonts.css': '<%= app %>/sass/fonts.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    lineNumbers: false
                },
                files: {
                    '<%= app %>/build/css/main.css': '<%= app %>/sass/main.scss',
                    '<%= app %>/css/fonts.css': '<%= app %>/sass/fonts.scss'
                }
            }
        },

        eslint: {
            all: [
                'src/**/*.*'
            ]
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },

            watchsass: {
                files: [
                    '<%= app %>/sass/**/*.scss',
                ],
                tasks: ['sass:dev']
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

    grunt.registerTask('default', ['webpack', 'watch']);
};
