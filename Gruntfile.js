module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
      },
      livereload: {
        options: {
          base: 'dev/',
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
          'dist/js/script.js': ['dev/js/script.js']
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['dev/js/*.js']
    },
    copy: {
      dist: {
        expand: true,
        cwd: 'dev/',
        dest: 'dist',
        src: '**'
      }
    },
    clean: {
      build: ['dist/_sass']
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['dev/js/*.js'],
        tasks: ['jshint']
      },
      compass: {
        files: ['dev/_sass/*.scss'],
        tasks: ['compass']
      },
      livereload: {
        files: ['dev/index.html']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('css', ['compass']);
  grunt.registerTask('build', ['css', 'copy', 'clean', 'uglify']);
};