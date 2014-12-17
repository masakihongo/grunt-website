'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            // Configurable paths
            dev: 'dev/',
            dist: 'dist/',
            asset: 'share/'
        },

        watch: {
            js: {
                files: ['<%= dir.dev %><%= dir.asset %>js/*.js'],
                tasks: ['jshint']
            },
            concat: {
                files: ['<%= dir.dev %><%= dir.asset %>js/plugins/*.js'],
                tasks: ['concat']
            },
            compass: {
                files: ['<%= dir.dev %><%= dir.asset %>sass/{,*/}*.scss'],
                tasks: ['compass']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= dir.dev %>**/*.html',
                    '<%= dir.dev %>**/*.js',
                    '<%= dir.dev %>**/*.css'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    base: '<%= dir.dev %>',
                    open: true
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: '<%= dir.dev %><%= dir.asset %>sass',
                    cssDir: '<%= dir.dev %><%= dir.asset %>css',
                    imagesDir: '<%= dir.dev %><%= dir.asset %>img/sprite',
                    generatedImagesDir: '<%= dir.dev %><%= dir.asset %>img',
                    httpGeneratedImagesPath: '/<%= dir.asset %>/img',
                    javascriptsDir: '<%= dir.dev %><%= dir.asset %>js',
                    fontsDir: '<%= dir.dev %><%= dir.asset %>fonts',
                    outputStyle: 'compact',
                    noLineComments: true,
                    relativeAssets: false,
                    assetCacheBuster: false
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= dir.dev %><%= dir.asset %>js/*.js'
            ]
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dir.dev %><%= dir.asset %>js',
                    src: '*.js',
                    dest: '<%= dir.dist %><%= dir.asset %>js'
                }]
            }
        },

        cssmin: {
            files: {
                expand: true,
                cwd: '<%= dir.dev %><%= dir.asset %>css/',
                dest: '<%= dir.dist %><%= dir.asset %>css/',
                src: ['*.css']
            }
        },

        concat: {
            files: {
                src: '<%= dir.dev %><%= dir.asset %>js/plugins/**.js',
                dest: '<%= dir.dev %><%= dir.asset %>js/lib/plugins.js'
            }
        },

        copy: {
            dist: {
                expand: true,
                cwd: '<%= dir.dev %>',
                dest: '<%= dir.dist %>',
                src: '**'
            }
        },

        clean: {
            all: {
                src: ['<%= dir.dist %>']
            },
            dist: {
                src: ['<%= dir.dist %><%= dir.asset %>js/plugins', '<%= dir.dist %><%= dir.asset %>_sass']
            }

        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', [
        'concat',
        'compass',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:all',
        'concat',
        'compass',
        'copy',
        'clean:dist',
        'uglify',
        'cssmin'
    ]);
};