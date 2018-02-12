"use strict";

var gulp = require('gulp'),
    cfg = require('../package.json').config,
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    runseq = require('run-sequence');

gulp.task('sass', function () {
  return gulp.src(cfg.src.scss + '**/*.{scss,sass}')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sass({
      includePaths: [cfg.src.scss],
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cfg.build.css));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(cfg.src.scss + '/**/*.*', ()=>runseq('sync','sass'));
});
