"use strict";

var gulp = require('gulp'),
  cfg = require('../package.json').config,
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src(cfg.src.js + '**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest(cfg.build.js))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(cfg.build.js));
});