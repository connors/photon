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
        distPath:       'dist/',
        docsAssetsPath: 'docs/assets/',
        docsDistPath:   'docs/dist/',
        docsPath:       'docs/',
        sassPath:       'sass/',
        jsPath:         'js/',
    },

    banner: '/*!\n' +
            ' * =====================================================\n' +
            ' * Photon v<%= pkg.version %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %> (https://github.com/connors/proton/blob/master/LICENSE)\n' +
            ' *\n' +
            ' * v<%= pkg.version %> designed by @connors.\n' +
            ' * =====================================================\n' +
            ' */\n',

    clean: {
      dist: [
        '<%= meta.distPath %>/css',
        '<%= meta.distPath %>/js',
        '<%= meta.docsDistPath %>/css',
        '<%= meta.docsDistPath %>/js'
      ]
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
      },
      docs: {
        src: 'sass/docs.scss',
        dest: '<%= meta.docsAssetsPath %>css/docs.css'
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

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/*',
        dest: '<%= meta.distPath %>'
      },
      docs: {
        expand: true,
        cwd: '<%= meta.distPath %>',
        src: [
          '**/*'
        ],
        dest: '<%= meta.docsDistPath %>'
      }
    },

    concat: {
      js: {
        src: [
          '<%= meta.jsPath %>/photon.js',
          '<%= meta.jsPath %>/*.js'
        ],
        dest: '<%= meta.distPath %>/js/photon.js'
      },
    },

    cssmin: {
      options: {
        keepSpecialComments: '*' // keep all important comments
      },
      docs: {
        src: [
          '<%= meta.docsAssetsPath %>css/docs.css',
          '<%= meta.docsAssetsPath %>css/pygments-manni.css',
          '<%= meta.docsAssetsPath %>css/normalize.css'
        ],
        dest: '<%= meta.docsAssetsPath %>css/docs.min.css'
      }
    },

    watch: {
      options: {
        hostname: 'localhost',
        livereload: true,
        port: 8000
      },
      css: {
        files: '<%= meta.sassPath %>**/*.scss',
        tasks: ['dist-css', 'copy']
      },
      js: {
        files: '<%= meta.jsPath %>/*.js',
        tasks: ['concat']
      },
      html: {
        files: '<%= meta.docsPath %>**',
        tasks: ['jekyll']
      }
    },

    jekyll: {
      options: {
        config: '_config.yml'
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    connect: {
      site: {
        options: {
          base: '_site/',
          hostname: 'localhost',
          livereload: true,
          open: true,
          port: 8000
        }
      }
    }

  });


  // Load the plugins
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Tasks
  grunt.registerTask('dist-css', ['sass', 'usebanner', 'cssmin']);
  grunt.registerTask('dist', ['clean', 'dist-css', 'copy', 'concat']);
  grunt.registerTask('server', ['dist', 'jekyll:docs', 'connect', 'watch']);

  grunt.registerTask('default', ['dist']);
};
