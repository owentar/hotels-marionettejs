/*global module:false*/
module.exports = function(grunt) {

  var reloadPort = 35729, files;

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
      ' Licensed <%= pkg.license %> */\n',

    // Task configuration.
    develop: {
      server: {
        file: 'app.js'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          _: true,
          jQuery: true,
          Backbone: true,
          Marionette: true
        }
      },
      all: ['app/**/*.js']
    },

    jasmine: {
      src: ['specs/**/*.js']
    },

    wiredep: {
      target: {
        src: [
          'views/layout.html'
        ],
        ignorePath: '../public'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['wiredep', 'jshint', 'jasmine', 'develop', 'watch']);

};
