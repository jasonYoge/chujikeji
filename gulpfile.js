'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var options = process.argv;
var proname = options[2].slice(options[2].indexOf('=') + 1) || '**';
var filename = options[3].slice(options[3].indexOf('=') + 1) || '*';
var css_path = 'app/' + proname + '/css/' + filename + '.css';
var js_path = 'app/' + proname + '/js/' + filename + '.js';
var js_min_path = 'app/' + proname + '/js/' + filename + '.min.js';

gulp.task('serve', function () {
    browserSync.init({
        server: './app'
    });

    gulp.watch(css_path, ['css']);
    gulp.watch(js_path, ['js']);
    gulp.watch('app/' + proname + '/' + filename + '.html' ).on('change', reload);
});

gulp.task('js', function () {
    return gulp.src(js_path)
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest(js_min_path))
        .pipe(reload({stream: true}));
});

gulp.task('css', function () {
    return gulp.src(css_path)
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);
