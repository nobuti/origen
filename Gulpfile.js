// initalize Gulp.js
var gulp = require('gulp');

// initalize Plugins
var clean = require('gulp-clean'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglifyjs'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  gutil = require('gulp-util'),
  minify = require('gulp-minify-css'),
  nunjucksRender = require('gulp-nunjucks-render'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  webpack = require('gulp-webpack'),
  ghPages = require('gulp-gh-pages');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

//watch for changes
gulp.task('watch', function() {
  gulp.watch('assets/stylesheets/**/*.scss', ['styles']);
  gulp.watch('assets/javascripts/**/*.js', ['webpack']);
  gulp.watch('assets/images/**/*', ['images']);
  gulp.watch('views/**/*.html', ['layout']);
});

//Clean up the build directory
gulp.task('clean', function() {
  return gulp.src('public/', {
      read: false
    })
    .pipe(clean());
});

//Dev tasks
gulp.task("webpack", function() {
  return gulp.src('assets/javascripts/application.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public/javascripts/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('styles', function() {
  return gulp.src('assets/stylesheets/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(gulp.dest('public/stylesheets/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('layout', function() {
  nunjucksRender.nunjucks.configure(['views']);

  return gulp.src(['views/**/*.html', '!views/layout/*.html', '!views/partials/*.html'])
    .pipe(nunjucksRender())
    .pipe(gulp.dest('public/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(gulp.dest('public/images/'));
});

//Build tasks
gulp.task('optim', ['images'], function() {
  return gulp.src('public/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'));
});

gulp.task('uglify', ['webpack'], function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('public/stylesheets/*.css')
    .pipe(minify())
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('deploy', ['layout', 'styles', 'webpack', 'images'], function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('dev', ['layout', 'styles', 'webpack', 'images', 'browser-sync', 'watch']);
gulp.task('build', ['layout', 'minify', 'uglify', 'optim']);

gulp.task('default', ['clean'], function() {
  gulp.start('dev');
});

