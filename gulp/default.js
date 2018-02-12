"use strict";

var gulp = require('gulp');
var runseq = require('run-sequence');

gulp.task('default', function(){
	runseq(
		'sync',
		'sass',
    'scripts',
    'pug',
		'server',
		'sync:watch',
		'sass:watch'
	);
});