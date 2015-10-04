/*!
 * Photon's Gruntfile
 * Copyright 2015 Connor Sears
 * Licensed under MIT (https://github.com/connors/photon/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Metadata.
    meta: {
        srcPath:        'sass/',
        distPath:       'dist/css'
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * Photon v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/connors/proton/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @connors.\n' +
            ' * =====================================================\n' +
            ' */\n',

    clean: {
      dist: ['<%= meta.distPath %>']
    },

    sass: {
      options: {
        sourcemap: 'none',
        style: 'expanded',
        unixNewlines: true
      },
      core: {
        src: 'sass/photon.scss',
        dest: '<%= meta.distPath %>css/<%= pkg.name %>.css'
      }
		},

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            '<%= meta.distPath %>css/*.css'
          ]
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: '*' // keep all important comments
      },
      ratchet: {
        src: '<%= meta.distPath %>css/<%= pkg.name %>.css',
        dest: '<%= meta.distPath %>css/<%= pkg.name %>.min.css'
      }
    },

  });


  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Tasks
  grunt.registerTask('dist-css', ['sass', 'usebanner', 'cssmin']);
  grunt.registerTask('dist', ['clean', 'dist-css']);

  grunt.registerTask('default', ['dist']);
};
