module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      app: '.',
      assets: 'assets/',
      js: 'public/javascripts/vendor/',
      css: 'public/stylesheets/',
      images: 'public/images/',
      sass: 'sass/',
      port: 3000
    },

    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'public/stylesheets/ducktypen.css': 'sass/ducktypen.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/stylesheets/ducktypen.min.css': 'sass/ducktypen.scss'
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
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true,
        }
      },

      js: {
        files: ['javascripts/**/*.js'],
        tasks: ['concat'],
        options: {
          livereload: true,
        }
      }

    },

    server: {
       port: 3000,
       base: '.'
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 5 versions', 'Firefox ESR', 'Opera 12.1']
      },
      no_dest: {
        src: 'public/stylesheets/ducktypen.css'
      }
    },

    copy: {
      dist: {
       files: [{
         expand: false,
         src: 'node_modules/jquery/dist/jquery.js',
         dest: 'javascripts/vendor/jquery.js',
         filter: 'isFile'
       },
       {
         expand: false,
         src: 'node_modules/modernizr/modernizr.js',
         dest: 'public/javascripts/modernizr.js',
         filter: 'isFile'
       },
       {
         expand: false,
         src: 'node_modules/owl-carousel/owl-carousel/owl.carousel.js',
         dest: 'javascripts/vendor/owl.carousel.js',
         filter: 'isFile'
       },
       {
         expand: false,
         src: 'node_modules/owl-carousel/owl-carousel/owl.carousel.css',
         dest: 'sass/vendor/_owl-carousel.scss',
         filter: 'isFile'
       }]
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['javascripts/vendor/jquery.js', 'javascripts/vendor/owl.carousel.js', 'javascripts/app.js', 'javascripts/module.js'],
        dest: 'public/javascripts/app.js',
      },
    },

    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      app: {
        files: {
          'public/javascripts/app.min.js': ['public/javascripts/app.js']
        }
      },
      modernizr: {
        files: {
          'public/javascripts/modernizr.min.js': ['public/javascripts/modernizr.js']
        }
      }
    },

    sprite: {
      all: {
        src: 'sprites/*.png',
        destImg: 'public/images/sprites.png',
        destCSS: 'sass/objects/_sprites.scss',
        imgPath: '/images/sprites.png'
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('express', 'Start a custom web server', function() {
      grunt.log.writeln('Started web server on port 3000');
      require('./index.js').listen(3000);
  });

  grunt.registerTask('help', 'Log some stuff.', function() {
    grunt.log.subhead('This grunt file contains these tasks:');
    grunt.log.writeln('- grunt: to show command help');
    grunt.log.writeln('- grunt build: to compile sass');
    grunt.log.writeln('- grunt assets: to copy bower assets to public');
    grunt.log.writeln('- grunt sprites: to generate the sprite master sheet. Just drop the sprites in assets/sprites and run the task.');
    grunt.log.writeln('- grunt server: to lunch server');
    grunt.log.subhead('You should launch grunt:server in development.');
  });

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['sass:dist', 'uglify']);
  grunt.registerTask('assets', ['copy']);
  grunt.registerTask('sprites', ['sprite']);
  grunt.registerTask('pack', ['concat']);
  grunt.registerTask('server', ['sass:dev', 'express', 'open:dev', 'watch']);
}