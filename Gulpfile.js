// initalize Gulp.js
var gulp = require('gulp');

// initalize Plugins
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglifyjs');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var ghPages = require('gulp-gh-pages');
var inject = require('gulp-inject');

var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
});

// watch for changes
gulp.task('watch', function () {
  gulp.watch('assets/stylesheets/**/*.scss', ['styles']);
  gulp.watch('assets/javascripts/**/*.js', ['js']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch('views/**/*.html', ['layout']);
});

// Clean up the build directory
gulp.task('clean', function () {
  return gulp.src('public/', {
    read: false
  })
  .pipe(clean());
});

gulp.task('js', function () {
  return browserify('assets/javascripts/application.js', {debug: true, extensions: ['es6']})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(reload({stream: true}));
});

// Dev tasks
gulp.task('index', function () {
  gulp.src('views/index.html')
    .pipe(inject(
      gulp.src(['views/*.html', '!views/index.html'], { read: false }), {
        transform: function (filepath) {
          if (filepath.slice(-5) === '.html') {
            var path = filepath.split('/');
            var file = path[path.length - 1];
            return '<li><a href="' + file + '">' + file + '</a></li>';
          }
          // Use the default transform as fallback:
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(gulp.dest('public/'));
});

gulp.task('styles', function () {
  return gulp.src('assets/stylesheets/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('layout', function () {
  nunjucksRender.nunjucks.configure(['views']);

  return gulp.src(['views/**/*.html', '!views/index.html', '!views/layout/*.html', '!views/partials/*.html'])
    .pipe(nunjucksRender())
    .pipe(gulp.dest('public/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('public/images/'));
});

// Build tasks
gulp.task('optim', ['images'], function () {
  return gulp.src('public/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

gulp.task('uglify', ['js'], function () {
  return gulp.src('public/javascripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('minify', ['styles'], function () {
  return gulp.src('public/stylesheets/*.css')
    .pipe(minify())
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('deploy', ['layout', 'styles', 'js', 'images'], function () {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('dev', ['index', 'layout', 'styles', 'js', 'images', 'browser-sync', 'watch']);
gulp.task('build', ['layout', 'minify', 'uglify', 'optim']);

gulp.task('default', ['clean'], function () {
  gulp.start('dev');
});

