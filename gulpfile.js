
var del = require('del');
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sequence = require('gulp-sequence');
var json = require('gulp-json-editor');

gulp.task('clean:build', function() {
    return del(['build/**/*']);
});

gulp.task('clean:package', function() {
    return del(['package/**/*']);
});

gulp.task('build', ['clean:build'], function() {

    var config = typescript.createProject('tsconfig.json');

    return gulp.src('src/**/*.ts')
        .pipe(config())
        .pipe(gulp.dest('build'));
});

gulp.task('package:package.json', function() {

    gulp.src('package.json')
        .pipe(json({  'bin': { 'apiscript': 'index.js' } }))
        .pipe(gulp.dest('package'));
});

gulp.task('package:license', function() {

    return gulp.src('./LICENSE')
        .pipe(gulp.dest('package'));
});

gulp.task('package:src', function() {

    return gulp.src('build/main/**/*')
        .pipe(gulp.dest('package'));
});

gulp.task('clean', ['clean:build', 'clean:package']);
gulp.task('package', sequence('clean:package', 'build', 'package:src', 'package:license', 'package:package.json'));