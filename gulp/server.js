"use strict";

var gulp = require('gulp'),
  cfg = require('../package.json').config,
  browserSync = require('browser-sync').create();

// Static server
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: cfg.build.baseDir
    },
    files: [
      cfg.build.baseDir + '*.html',
      cfg.build.css + '*.css',
      cfg.build.js + '*.js',
      cfg.build.img + '*.*'
    ]
  });
});