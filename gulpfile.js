'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const del = require('del');
const htmlmin = require("gulp-htmlmin");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const babel = require('gulp-babel');
const uglify = require("gulp-uglify");
const rollup = require('gulp-better-rollup');
const browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest('source/css/'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css/'));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
    .pipe(gulp.dest('build/'))
});

gulp.task("js", function () {
  return gulp.src("source/js/**/*.js")
    .pipe(plumber())
    .pipe(rollup({}, 'iife'))
    .pipe(babel({
      presets: ['babel-preset-es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task('fonts', function() {
  return gulp.src('source/**/*.{woff,woff2}')
    .pipe(gulp.dest('build'));
})

gulp.task('clean', function() {
  return del('build');
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'build'
  });

  gulp.watch("source/**/*.scss", gulp.series('styles'));
  gulp.watch("source/**/*.html", gulp.series('html'));
  gulp.watch("source/**/*.js", gulp.series('js'));
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task(`build`, gulp.series('clean', gulp.parallel('styles', 'html', 'js', 'images', 'fonts')));
