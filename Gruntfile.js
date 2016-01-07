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
          'public/stylesheets/sandbox.css': 'assets/sass/sandbox/sandbox.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'public/stylesheets/sandbox.css': 'assets/sass/sandbox/sandbox.scss'
        }
      }
    },

    open : {
      dev : {
        path: 'http://localhost:3000',
        app: 'Google Chrome'
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      options: {
        livereload: true
      },

      sass: {
        files: ['assets/sass/**/*.scss', 'views/**/*.html'],
        tasks: ['sass:dev', 'autoprefixer'],
        options: {
          livereload: true,
        }
      },

      js: {
        files: ['assets/**/*.js'],
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
        src: 'public/stylesheets/*.css'
      }
    },

    sprite: {
      all: {
        src: 'assets/sprites/*.png',
        destImg: 'public/images/sprites.png',
        destCSS: 'assets/sass/objects/_sprites.scss',
        imgPath: '/images/sprites.png'
      }
    },

    clean: ['assets/svg/icons/compressed'],

    svgstore: {
      options: {
        prefix : 'icon-',
        svg: {
          style: "display: none;"
        }
      },
      icons : {
        options: {
          cleanup: ['fill','stroke'],
        },
        files: {
          "assets/sandbox-icons.svg": ["assets/svg/icons/compressed/*.svg"]
        }
      }
    },

    rename: {
      icons: {
        files: [
            {src: ['assets/sandbox-icons.svg'], dest: 'views/partial/svg-icons.html'}
        ]
      }
    },

    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }
        ]
      },
      icons: {
        expand: true,
        cwd: 'assets/svg/icons',
        src: ['*.svg'],
        dest: 'assets/svg/icons/compressed'
      }
    },

    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'public/javascript/sandbox.js': ['assets/javascript/jquery.js',
                                           'assets/javascript/main.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['assets/javascript/jquery.js',
              'assets/javascript/main.js'],
        dest: 'public/javascript/sandbox.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('express', 'Start a custom web server', function() {
      grunt.log.writeln('Started web server on port 3000');
      require('./index.js');
  });

  grunt.registerTask('help', 'Log some stuff.', function() {
    grunt.log.subhead('This grunt file contains these tasks:');
    grunt.log.writeln('- grunt: to show command help');
    grunt.log.writeln('- grunt build: to compile sass');
    grunt.log.writeln('- grunt sprites: to generate the sprite master sheet. Just drop the sprites in assets/sprites and run the task.');
    grunt.log.writeln('- grunt svg: svg factory. Just drop the svg files in assets/svg and run the task.');
    grunt.log.writeln('- grunt server: to lunch server');
    grunt.log.subhead('You should launch grunt:server in development.');
  });

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['uglify', 'sass:dist', 'autoprefixer']);
  grunt.registerTask('sprites', ['sprite']);
  grunt.registerTask('svg', ['svgmin', 'svgstore', 'rename', 'clean']);
  grunt.registerTask('server', ['concat', 'sass:dev', 'express', 'open:dev', 'watch']);
  grunt.registerTask('heroku', ['uglify', 'sass:dist', 'autoprefixer']);
}
