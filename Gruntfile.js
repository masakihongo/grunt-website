module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dir: {
        // Configurable paths
        dev: 'dev/',
        dist: 'dist/'
    },

    connect: {
      options: {
      },
      livereload: {
        options: {
          base: '<%= dir.dev %>',
          open: true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          '<%= dir.dist %>js/script.js': ['<%= dir.dev %>js/script.js']
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: '<%= dir.dev %>_sass',
          cssDir: '<%= dir.dev %>css',
          imagesDir: '<%= dir.dev %>_sass/sprite',
          generatedImagesDir: '<%= dir.dev %>img',
          httpGeneratedImagesPath: '/img',
          javascriptsDir: '<%= dir.dev %>js',
          fontsDir: '<%= dir.dev %>fonts',
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
      all: ['<%= dir.dev %>js/*.js']
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
      build: ['<%= dir.dist %>_sass']
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['<%= dir.dev %>js/*.js'],
        tasks: ['jshint']
      },
      compass: {
        files: ['<%= dir.dev %>_sass/{,*/}*.scss'],
        tasks: ['compass']
      },
      livereload: {
        files: ['<%= dir.dev %>{,*/}*.html']
      }
    },
    concat: {
      files: {
        src: '<%= dir.dev %>lib/plugins/**.js',
        dest: '<%= dir.dev %>lib/js/plugins.js'
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['concat', 'connect', 'watch']);
  grunt.registerTask('build', ['concat', 'compass', 'copy', 'clean', 'uglify']);
};