module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      app: '.',
      assets: 'assets/',
      js: 'public/javascripts/vendor/',
      css: 'public/stylesheets/',
      port: 3000
    },

    sass: {
      options: {
        includePaths: ['assets/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/stylesheets/app.css': 'sass/app.scss'
        }
      }
    },

    open : {
      dev : {
        path: 'http://localhost:3000/',
        app: 'Google Chrome'
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      
      options: {
        livereload: true
      },

      sass: {
        files: ['sass/**/*.scss', 'views/**/*.ejs'],
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      }
    },

    server: {
       port: 3000,
       base: '.'
    },

    shell: {
      express: {
        options: {
          stdout: true
        },
        command: 'node index.js'
      }
    },

    copy: {
      dist: {
       files: [{
         expand: false,
         src: '<%= config.assets %>jquery/dist/jquery.min.js',
         dest: '<%= config.js %>jquery.min.js',
         filter: 'isFile'
       },
       {
         expand: false,
         src: '<%= config.assets %>foundation/js/foundation.min.js',
         dest: '<%= config.js %>foundation.min.js',
         filter: 'isFile'
       },
       {
         expand: false,
         src: '<%= config.assets %>modernizr/modernizr.js',
         dest: '<%= config.js %>modernizr.js',
         filter: 'isFile'
       }]
      }
    },
  });
  
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('express', 'Start a custom web server', function() {
      grunt.log.writeln('Started web server on port 3000');
      require('./index.js').listen(3000);
  });

  grunt.registerTask('help', 'Log some stuff.', function() {
    grunt.log.subhead('This grunt file contains these tasks:');
    grunt.log.writeln('- grunt: to show command help');
    grunt.log.writeln('- grunt build: to compile sass');
    grunt.log.writeln('- grunt assets: to copy bower assets to public');
    grunt.log.writeln('- grunt server: to lunch server');
    grunt.log.subhead('You should launch grunt:server in development.');
  });

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['sass']);
  grunt.registerTask('assets', ['copy']);
  grunt.registerTask('server', ['express', 'open:dev', 'watch']);
}