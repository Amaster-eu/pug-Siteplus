"use strict";

/* ==========================================================================
  Copy to Build:
  1. *.html
  2. *.ico(png)
  3. /img/*.*
  4. /js/*.*
  Browser Sync
  ========================================================================== */

var gulp = require('gulp'),
    cfg = require('../package.json').config,
    runseq = require('run-sequence');

// 1
gulp.task('sync', ['sync-ico','sync-img','sync-js'], function() {
  return gulp.src(cfg.src.baseDir + '**/*.html')
    .pipe(gulp.dest(cfg.build.baseDir))
});

// 2
gulp.task('sync-ico', function() {
  return gulp.src(cfg.src.baseDir + '*.{ico,png}')
    .pipe(gulp.dest(cfg.build.baseDir))
});

// 3
gulp.task('sync-img', function() {
  return gulp.src(cfg.src.img + '**/*.*')
    .pipe(gulp.dest(cfg.build.img))
});

// 4
gulp.task('sync-js', function() {
  return gulp.src(cfg.src.js + '**/*.*')
  	.pipe(gulp.dest(cfg.build.js))
});

gulp.task('sync:watch', function () {
  gulp.watch(cfg.src.baseDir + '**/*.*', ()=>runseq('sync','sync-ico','sync-img','sync-js'));
});


