// initalize Gulp.js
var gulp = require('gulp');

// initalize Plugins
var clean = require('gulp-clean'),
  imagemin = require('gulp-imagemin'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  gutil = require('gulp-util'),
  nunjucksRender = require('gulp-nunjucks-render'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  browserify = require('browserify'),
  source = require('vinyl-source-stream');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    }
  });
});

//watch for changes
gulp.task('watch', function() {
  gulp.watch('assets/stylesheets/*.scss', ['styles']);
  gulp.watch('assets/javascript/*.js', ['browserify']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch('views/**/*.html', ['layout']);
});

//Clean up the build directory
gulp.task('clean', function() {
  return gulp.src('build/', {
      read: false
    })
    .pipe(clean());
});

gulp.task('browserify', function() {
  return browserify({
        entries: 'assets/javascripts/application.js',
        paths: ['./node_modules', './assets/javascripts']
      })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('build/javascripts/'));
});

gulp.task('layout', function() {
  nunjucksRender.nunjucks.configure(['views']);

  return gulp.src(['views/**/*.html', '!views/layout/*.html', '!views/partials/*.html'])
    .pipe(nunjucksRender())
    .pipe(gulp.dest('build/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('build/images/'));
});

//Compress all images
// gulp.task('images-pro', function() {
//   return gulp.src('assets/images/**/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('build/images'));
// });

gulp.task('uglify', ['browserify'], function() {
  return gulp.src('build/javascript/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/javascript/'));
});

//Compress, compile and autoprefix SASS (SCSS) files
gulp.task('styles', function() {
  return gulp.src('assets/stylesheets/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(gulp.dest('build/stylesheets/'));
});

//Compress, compile and autoprefix SASS (SCSS) files
// gulp.task('styles-pro', function() {
//   return gulp.src('assets/stylesheets/*.scss')
//     .pipe(sass())
//     .pipe(autoprefixer({
//         browsers: ['> 1%', 'last 2 versions', 'ie 9'],
//         cascade: false
//     }))
//     .pipe(minifyCSS())
//     .pipe(gulp.dest('build/stylesheets/'));
// });

gulp.task('dev', ['layout', 'styles', 'browserify', 'images', 'browser-sync', 'watch']);
gulp.task('build', ['layout', 'styles', 'browserify', 'images']);

gulp.task('default', ['clean'], function() {
  gulp.start('dev');
});

