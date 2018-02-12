"use strict";

/* ==========================================================================
  Compile .pug files
  ========================================================================== */
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    cfg = require('../package.json').config;

gulp.task('pug', function() {
  return gulp.src(cfg.src.pug + '*.pug')
    .pipe(pug())
    .on('error', function(err) {
      process.stderr.write(err.message + '\n');
      this.emit('end');
    })
    .pipe(gulp.dest(cfg.build.baseDir));
});

gulp.task('pug:watch', function () {
  gulp.watch(cfg.src.baseDir + '**/*.pug', ()=>runseq('sync','pug'));
});